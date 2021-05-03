const User = require('../Models/User');

const userController = {
  register: async (req, res) => {
    let message;
    try {
      const user = new User(req.body);
      user.password = await user.encryptPassword(user.password);
      await user.save();
      message = 'El registro fue exitoso';
      res.status(200).send(message);
    } catch (err) {
      message = err.message;
      res.status(500).send(message);
    }
  },
};

module.exports = userController;
