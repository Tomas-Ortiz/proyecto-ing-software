const mongoose = require('mongoose');

const { Schema } = mongoose;

// Se define y se exporta el esquema de una mascota

const petSchema = new Schema({
  type: { type: String, required: true },
  name: String,
  age: Number,
  gender: { type: String, enum: ['Macho', 'Hembra'], required: true },
  colour: { type: String, required: true },
  petDescription: String,
  petPictures: [String],
});

module.exports = mongoose.model('Pet', petSchema);
