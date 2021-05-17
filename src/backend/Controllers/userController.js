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
      result = {
        success: true,
        msg: 'El registro fue exitoso',
      };
      res.status(200).send(result);
    } catch (err) {
      result = {
        success: false,
        msg: err.message,
      };
      res.status(400).send(result);
    }
  },

  getUser: async (req, res) => {
    let result = {};
    try {
      const { token } = req.headers;
      const userDecoded = await jwt.verify(token, config.key);
      // Si no se encuentra ningún usuario se lanza un error (orFail) y lo captura el catch
      // ahorra el if adicional
      const user = await User.findOne({ _id: userDecoded.userId }).orFail();
      result = {
        success: true,
        msg: user,
      };
      res.status(200).send(result);
    } catch (err) {
      result = {
        success: false,
        msg: err.message,
      };
      res.status(400).send(result);
    }
  },

  updateProfile: async (req, res) => {
    let result = {};
    try {
      const user = req.body;
      if (user.account.password) {
        user.account.password = await User.encryptPassword(
          user.account.password
        );
      }
      // se usa findOneAndUpdate ya que updateOne no devuelve un documento
      // new: true para devolver el documento ya actualizado
      const updatedUser = await User.findOneAndUpdate({ _id: user.id }, user, {
        new: true,
      }).orFail();
      result = {
        success: true,
        msg: updatedUser,
      };
      res.status(200).send(result);
    } catch (err) {
      result = {
        success: false,
        msg: err.message,
      };
      res.status(400).send(result);
    }
  },
};

module.exports = userController;
