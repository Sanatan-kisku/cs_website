const express = require('express');
const Content = require('../models/Content');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:sectionId', async (req, res) => {
  const { sectionId } = req.params;
  const section = await Content.findOne({ sectionId });
  res.json({ content: section?.content || '' });
});

router.post('/:sectionId', verifyToken, async (req, res) => {
  const { sectionId } = req.params;
  const { content } = req.body;
  await Content.findOneAndUpdate({ sectionId }, { content }, { upsert: true });
  res.json({ message: 'Content saved' });
});

module.exports = router;