const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

// Se define y se exporta el esquema de un usuario

const userSchema = new Schema({
  type: { type: String, enum: ['Particular', 'ONG'], required: true },
  fullname: { type: String, required: true },
  NID: String,
  description: String,
  location: {
    _id: false,
    type: { country: String, city: String, address: String },
    required: true,
  },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  contact: {
    _id: false,
    type: [{ contactType: String, value: String }],
    required: true,
  },
  profilePicture: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  account: {
    createdAt: { type: Date, default: Date.now(), required: true },
    isActive: { type: Boolean, default: true, required: true },
    isConfirmed: { type: Boolean, default: false, required: true },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      required: true,
    },
  },
});

// Encriptación con bcrypt (método estático)
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

module.exports = mongoose.model('User', userSchema);
