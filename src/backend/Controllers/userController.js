/* eslint-disable no-empty */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/User');
const config = require('../configs/config');

const userController = {
  register: async (req, res) => {
    let result = {};
    try {
      const user = new User(req.body);
      user.password = await User.encryptPassword(user.password);
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

  login: async (req, res) => {
    let result = {};
    try {
      User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
          return res.status(500).json({
            title: 'server error',
            error: err,
          })
        }
        if (!user) {
          return res.status(401).json({
            title: 'user not found',
            error: 'Contraseña y/o email incorrecto',
          })
        }
        // incorrect pass
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(401).json({
            title: 'login failed',
            error: 'Contraseña y/o email incorrecto',
          })
        }
        // if all good send id
        const jToken = jwt.sign({userId: user._id}, 'secretKey');
        return res.status(200).json({
          title: 'Login exitoso',
          token: jToken,
        })
      })
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
      if (user.password) {
        user.password = await User.encryptPassword(user.password);
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
