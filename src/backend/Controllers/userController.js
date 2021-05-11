const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const config = require('../configs/config');

const userController = {
  register: async (req, res) => {
    let result = {};
    try {
      const user = new User(req.body);
      user.password = await user.encryptPassword(user.password);
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
      res.status(500).send(result);
    }
  },

  getUser: async (req, res) => {
    let result = {};
    try {
      const { token } = req.headers;
      const userDecoded = await jwt.verify(token, config.key);
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
      res.status(401).send(result);
    }
  },
};

module.exports = userController;
