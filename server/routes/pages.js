import { Router } from 'express';
import Page from '../models/Page';
const router = Router();

// C
router.post('/', async (req, res) => {
  const page = new Page({
    title: req.body.title,
    description: req.body.description,
    path: req.body.path,
    private: req.body.private,
    onNavBar: req.body.onNavBar,
    children: req.body.children,
    created_by: req.body.created_by
  })
  try {
    const newPage = await page.save()
    res.status(201).json(newPage)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})

// R-ALL
router.get('/', async (req, res) => {
  try {
    const pages = await Page.find();
    res.json(pages);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// R
router.get('/:id', getPage, (req, res) => {
  res.json(res.page)
})

// U
router.patch('/:id', getPage, async (req, res) => {
  const { title, description, path, hidden, onNavBar, children, created_by } = req.body
  try {
    const updatedPage = await res.page.updateOne({description, hidden, onNavBar, children, created_by})
    res.json(updatedPage)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})

// D
router.delete('/:id', getPage, async (req, res) => {
  try {
    await res.page.remove()
    res.json({ message: 'Deleted page' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

async function getPage(req, res, next) {
  let page
  try {
    page = await Page.findById(req.params.id)
    if (page === null) {
      return res.status(404).json({ message: 'Cannot find the page' })
    }
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }

  res.page = page
  next()
}

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next()
//   }
//
//   res.redirect('/login')
// }

export default router;
