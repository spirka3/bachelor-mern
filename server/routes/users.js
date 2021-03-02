import { Router } from 'express';
import User from '../models/User';
import bcrypt from "bcryptjs";
const router = Router();

// R-ALL
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// U profile
router.patch('/:id', getUser, async (req, res) => {
  const { name, email, role } = req.body;

  try {
    if (res.user.email !== email) {
      const user = await User.findOne({ email });
      if (user) throw Error('Email is already taken');
    }
    const savedUser = await res.user.updateOne({ name, email, role })
    res.json(savedUser)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})

// U avatar
router.patch('/avatar/:id', getUser, async (req, res) => {
  const { avatar } = req.body;

  try {
    const savedUser = await res.user.updateOne({ avatar })
    res.json(savedUser)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})

// U password
router.patch('/password/:id', getUser, async (req, res) => {
  const { password, newPassword, confirmPassword } = req.body;

  try {
    const isMatch = await bcrypt.compare(password, res.user.password);
    if (!isMatch) throw Error('Invalid credentials');

    if (password === newPassword)
    throw Error('New password is the same as the current')

    if (confirmPassword !== newPassword)
    throw Error('Passwords dont match')

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(newPassword, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const savedUser = await res.user.updateOne({password: hash})
    res.json(savedUser)
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
  console.log('here')
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

function updateUser(res, req) {
  const updatedUser = new User({})
  // fixme i also got _id :(
  for (const key in res.user.schema.obj) {
    if (key === '_id') continue
    const curVal = res.user[key]
    const newVal = req.body[key]
    updatedUser[key] = newVal !== undefined ? newVal : curVal
  }
  return updatedUser
}

export default router;
