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
  contact: [
    {
      _id: false,
      contactType: {
        type: String,
        required: [true, 'El tipo de contacto es requerido'],
      },
      value: { type: String, required: [true, 'El contacto es requerido'] },
    },
  ],
  profilePicture: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  account: {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
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

/* userSchema.statics.compareEncryptedPasswords =  compareEncryptedPasswords(loginpassword){
  if (!bcrypt.compareSync(loginpassword, user.password)){
    return res.status(400).json({
      title: 'login failed',
      error: 'wrong password'
    })
  }
} */

module.exports = mongoose.model('User', userSchema);
