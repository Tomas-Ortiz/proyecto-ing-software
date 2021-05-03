const User = require('../Models/User');

const userController = {
  register: async (req, res) => {
    //let user = req.body;
    //console.log(user);
    try {
      const user = new User({
        type: req.body.type,
        fullName: req.body.name,
        NID: req.body.NID,
        location: req.body.location,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact,
      });
      user.password = await user.encryptPassword(user.password);
      await user.save();
      res.status(200).send(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  },
};

module.exports = userController;
