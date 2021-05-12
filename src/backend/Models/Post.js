const mongoose = require('mongoose');

const { Schema } = mongoose;

// Se define y se exporta el esquema de una publicación

const postSchema = new Schema({
  title: { type: String, required: true },
  publishingDate: { type: Date, default: Date.now },
  pet: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Post', postSchema);
