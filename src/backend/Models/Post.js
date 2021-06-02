const mongoose = require('mongoose');

const { Schema } = mongoose;

// Se define y se exporta el esquema de una publicación
const postSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  publishingDate: { type: Date, default: Date.now },
  pet: {
    _id: false,
    name: { type: String, required: false },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    ageTime: { type: String, required: true },
    colour: { type: String, required: false },
    type: { type: String, required: true },
    species: { type: String, required: true },
    quantity: { type: Number, required: true },
    characteristics: { type: String, required: false },
    location: {
      _id: false,
      type: { country: String, city: String, address: String },
      required: true,
    },
    adoptionConditions: { type: String, required: false },
    images: [
      {
        _id: false,
        name: { type: String, required: true },
        type: { type: String, required: true },
        size: { type: Number, required: true },
        path: { type: String, required: true },
      },
    ],
  },
  isActive: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model('Post', postSchema);
