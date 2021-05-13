const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  const soloLetrasYTildes = /^[A-Za-zñáéíóú\s]+$/;
  return [
    body('fullname')
      .if(body('fullname').exists())
      .notEmpty()
      .withMessage('El nombre no puede estar vacío')
      .trim()
      .isLength({ max: 30 })
      .withMessage('El nombre no puede pasar los 30 caracteres')
      .matches(soloLetrasYTildes)
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
      .if(body('email').exists())
      .notEmpty()
      .withMessage('El email no puede estar vacío')
      .isEmail()
      .withMessage('El email debe tener el formato correcto')
      .normalizeEmail()
      .trim(),

    body('username')
      .if(body('username').exists())
      .isLength({ min: 5, max: 16 })
      .withMessage(
        'El username debe tener como mínimo 5 caracteres y 16 como máximo'
      )
      .trim()
      .not()
      .contains(' ')
      .withMessage('El nombre de usuario no puede tener espacios'),

    body('password')
      .if(body('password').exists())
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
      .if(body('location.country').exists())
      .notEmpty()
      .withMessage('El país no puede estar vacío')
      .trim()
      .matches(soloLetrasYTildes)
      .withMessage('El país solo debe contener letras'),

    body('location.city')
      .if(body('location.city').exists())
      .notEmpty()
      .withMessage('La ciudad no puede estar vacía')
      .trim()
      .matches(soloLetrasYTildes)
      .withMessage('La ciudad solo debe contener letras'),

    body('location.address')
      .if(body('location.address').exists())
      .notEmpty()
      .withMessage('La dirección no puede estar vacía')
      .trim(),

    body('contact.*.contactType')
      .if(body('contact.*.contactType').exists())
      .notEmpty()
      .withMessage('El tipo de contacto no puede estar vacío')
      .trim()
      .matches(soloLetrasYTildes)
      .withMessage('El tipo de contacto solo debe contener letras'),

    body('contact.*.value')
      .if(body('contact.*.value').exists())
      .notEmpty()
      .withMessage('El contacto no puede estar vacío')
      .trim(),
  ];
};

const validate = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  const reqBodyVacio = Object.keys(req.body).length === 0;
  if (reqBodyVacio) {
    errors = {
      success: false,
      msg: 'El cuerpo de la petición está vacio',
    };
    return res.status(400).send(errors);
  }
  next();
};

module.exports = { userValidationRules, validate };
