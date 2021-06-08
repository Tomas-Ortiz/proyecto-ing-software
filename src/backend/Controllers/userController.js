const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const config = require('../configs/config');

const userController = {
  register: async (req, res) => {
    let result = {};
    try {
      const user = new User(req.body);
      user.account.password = await User.encryptPassword(user.account.password);
      await user.save();
      result = { success: true, msg: 'El registro fue exitoso' };
      res.status(200).send(result);
    } catch (err) {
      result = { success: false, msg: err.message };
      res.status(400).send(result);
    }
  },

  login: async (req, res) => {
    let result = {};
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ 'account.email': email });
      if (!user) {
        result = { success: false, msg: 'El correo ingresado no existe' };
        return res.status(400).send(result);
      }
      const passwordIsValid = await User.passwordIsValid(
        password,
        user.account.password
      );
      // incorrect password
      if (!passwordIsValid) {
        result = { success: false, msg: 'Correo y/o contraseña incorrectos' };
        return res.status(401).send(result);
      }
      // if all good send token
      const jToken = jwt.sign({ userId: user._id }, config.key);
      result = { success: true, token: jToken };
      return res.status(200).send(result);
    } catch (err) {
      result = { success: false, msg: err.message };
      return res.status(400).send(result);
    }
  },

  getUser: async (req, res) => {
    let result = {};
    try {
      const token = req.headers.authorization;
      const userDecoded = jwt.verify(token, config.key);
      // Si no se encuentra ningún usuario se lanza un error (orFail) y lo captura el catch
      // ahorra el if adicional
      const user = await User.findOne({ _id: userDecoded.userId }).orFail();
      result = { success: true, msg: user };
      res.status(200).send(result);
    } catch (err) {
      result = { success: false, msg: err.message };
      res.status(400).send(result);
    }
  },

  getUserById: async (req, res) => {
    let result = {};
    try {
      const { id } = req.params;
      console.log(id);
      const user = await User.findOne({ _id: id }).orFail();
      result = { success: true, msg: user };
      res.status(200).send(result);
    } catch (err) {
      result = { success: false, msg: err.message };
      res.status(400).send(result);
    }
  },

  updateProfile: async (req, res) => {
    let result = {};
    try {
      const user = req.body;
      user.account.password = await User.encryptPassword(user.account.password);
      const updatedUser = {
        $set: {
          fullname: user.fullname,
          'account.email': user.account.email,
          'account.username': user.account.username,
          'account.password': user.account.password,
          location: user.location,
          contact: user.contact,
        },
      };
      await User.updateOne({ _id: user.id }, updatedUser).orFail();
      result = { success: true, msg: 'Usuario actualizado' };
      res.status(200).send(result);
    } catch (err) {
      result = { success: false, msg: err.message };
      res.status(400).send(result);
    }
  },
};

module.exports = userController;
