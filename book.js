const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  coverUrl: { type: String },
  user: { type: String, required: true }
});

module.exports = mongoose.model('Book', BookSchema);
