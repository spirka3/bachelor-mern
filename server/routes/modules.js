import { Router } from 'express';
import Module from '../models/Module';
const router = Router();

// C
router.post('/', async (req, res) => {
  const module = new Module({
    page: req.body.page,
    name: req.body.name,
    type: req.body.type,
    position: req.body.position,
    body: req.body.body,
    status: req.body.status
  })
  try {
    const newModule = await module.save()
    res.status(201).json(newModule)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})

// R-ALL
router.get('/', async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// R
router.get('/:id', getModule, (req, res) => {
  res.json(res.module)
})

// R by page
router.get('/page/:id', async (req, res) => {
  console.log(req.params)
  try {
    const modules = await Module.find({page: req.params.id});
    res.json(modules);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
})

// U
router.patch('/:id', getModule, async (req, res) => {
  if (req.body.page != null) {
    res.module.page = req.body.page
  }
  if (req.body.name != null) {
    res.module.name = req.body.name
  }
  if (req.body.type != null) {
    res.module.type = req.body.type
  }
  if (req.body.position != null) {
    res.module.position = req.body.position
  }
  if (req.body.status != null) {
    res.module.status = req.body.status
  }
  if (req.body.body != null) {
    res.module.body = req.body.body
  }
  try {
    const updatedModule = await res.module.save()
    res.json(updatedModule)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})

// D
router.delete('/:id', getModule, async (req, res) => {
  try {
    await res.module.remove()
    res.json({ message: 'Deleted module' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

async function getModule(req, res, next) {
  let module
  try {
    module = await Module.findById(req.params.id)
    if (module === null) {
      return res.status(404).json({ message: 'Cannot find the module' })
    }
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }

  res.module = module
  next()
}

export default router;
