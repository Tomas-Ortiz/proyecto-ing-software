const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    body('fullname')
      .notEmpty()
      .withMessage('El nombre no puede estar vacío')
      .trim()
      .isLength({ max: 30 })
      .withMessage('El nombre no puede pasar los 30 caracteres')
      .matches(/^[A-Za-z\s]+$/)
      .withMessage('El nombre solo debe contener letras'),

    body('NID')
      .if(body('NID').exists())
      .notEmpty()
      .withMessage('La identificación no puede estar vacía')
      .isLength({ max: 20 })
      .withMessage('La identificación no puede pasar los 20 caracteres')
      .trim(),

    body('description')
      .if(body('description').exists())
      .optional()
      .isLength({ max: 100 })
      .withMessage('La descripción no puede pasar de 100 caracteres'),

    body('email')
      .notEmpty()
      .withMessage('El email no puede estar vacío')
      .isEmail()
      .withMessage('El email debe tener el formato correcto')
      .normalizeEmail()
      .trim(),

    body('username')
      .isLength({ min: 5, max: 16 })
      .withMessage(
        'El username debe tener como mínimo 5 caracteres y 16 como máximo'
      )
      .trim(),

    body('password')
      .isLength({
        min: 8,
        max: 16,
      })
      .withMessage(
        'La contraseña debe tener como mínimo 8 caracteres y 16 como máximo'
      )
      .matches(/\d/)
      .withMessage('La contraseña debe tener al menos un número')
      .trim(),

    body('location.country')
      .notEmpty()
      .withMessage('El país no puede estar vacío')
      .trim()
      .matches(/^[A-Za-z\s]+$/)
      .withMessage('El país solo debe contener letras'),

    body('location.city')
      .notEmpty()
      .withMessage('La ciudad no puede estar vacía')
      .trim()
      .matches(/^[A-Za-z\s]+$/)
      .withMessage('La ciudad solo debe contener letras'),

    body('location.address')
      .notEmpty()
      .withMessage('La dirección no puede estar vacía')
      .trim(),

    body('contact.*.contactType')
      .notEmpty()
      .withMessage('El tipo de contacto no puede estar vacío')
      .trim()
      .matches(/^[A-Za-z\s]+$/)
      .withMessage('El tipo de contacto solo debe contener letras'),
    body('contact.*.value')
      .notEmpty()
      .withMessage('El contacto no puede estar vacío')
      .trim(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  next();
};

module.exports = { userValidationRules, validate };
