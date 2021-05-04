const User = require('../Models/User');

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
};

module.exports = userController;
