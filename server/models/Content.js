const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  sectionId: { type: String, unique: true },
  content: { type: String }
});

module.exports = mongoose.model('Content', contentSchema);