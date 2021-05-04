const express = require('express');
const { userValidationRules, validate } = require('../Middlewares/validator');
const controller = require('../Controllers/userController');

const router = express.Router();

// validacionesCampos es un middleware propio que valida los campos de entrada
// antes de mandarlo al controller
router.post('/register', userValidationRules(), validate, controller.register);

module.exports = router;
