import { Router } from 'express';
import User from '../models/User';
const router = Router();

// R-ALL
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// R
router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
})

// U
router.patch('/:id', getUser, async (req, res) => {
  // if (req.body.name != null) {
  //   res.user.name = req.body.name
  // }
  // if (req.body.email != null) {
  //   res.user.email = req.body.email
  // }
  // if (req.body.password != null) {
  //   res.user.password = req.body.password
  // } ... role
  res.user = req.body // test
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})

// D
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: 'Deleted user' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

async function getUser(req, res, next) {
  let user
  try {
    user = await User.findById(req.params.id)
    if (user === null) {
      return res.status(404).json({ message: 'Cannot find the user' })
    }
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }

  res.user = user
  next()
}

export default router;
