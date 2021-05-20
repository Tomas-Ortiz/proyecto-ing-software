const express = require('express');
const {
  userValidationRules,
  validate,
} = require('../Middlewares/dataValidator');
const validateToken = require('../Middlewares/tokenValidator');
const controller = require('../Controllers/userController');

const router = express.Router();

// validacionesCampos es un middleware propio que valida los campos de entrada
// antes de mandarlo al controller
router.post('/register', userValidationRules(), validate, controller.register);
router.post('/login', userValidationRules(), validate, controller.login);
router.put(
  '/updateProfile',
  userValidationRules(),
  validate,
  controller.updateProfile,
);
router.get('/getUser', validateToken, controller.getUser);

module.exports = router;
