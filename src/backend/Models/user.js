const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

// Se define y se exporta el esquema de un usuario

const userSchema = new Schema({
  type: { type: String, enum: ['Particular', 'ONG'], required: true },
  fullName: String,
  NID: String,
  description: String,
  location: {
    type: [{ country: String, city: String, address: String }],
    required: true,
  },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  contact: [{ contactType: String, value: String }],
  profilePicture: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

// Encriptación con bcrypt

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

module.exports = mongoose.model('User', userSchema);
