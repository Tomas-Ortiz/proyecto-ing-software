const { body, validationResult, param } = require('express-validator');

const postValidationRules = () => {
  const RegExp = {
    title: /^([A-Za-zñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ0-9'¡!¿?#|$%&/()=+.,*@:;[\]_\-][\s]{0,1}){8,60}$/,
    age: /^[1-9]([0-9]{0,3})$/,
    name: /^([a-zA-ZñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ][\s]{0,1}){0,30}$/,
    colour: /^([a-zA-ZñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ][\s]{0,1}){0,30}$/,
    soloLetras: /^[a-zA-ZñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ\s]+$/,
    characteristics: /^([\s]{0}[a-zA-ZñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ0-9¡!¿?#'|°"$%&/()=+.,{}*¨¨´´@:;[\]_-][\s]{0,1}){0,250}$/,
    adoptionConditions: /^([\s]{0}[a-zA-ZñáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ0-9¡!¿?#'|°"$%&/()=+.,{}*¨¨´´@:;[\]_-][\s]{0,1}){0,250}$/,
  };
  return [
    body('title')
      .notEmpty()
      .withMessage('El título no puede estar vacío')
      .isLength({ min: 8, max: 60 })
      .withMessage('El titulo debe tener entre 8 y 60 caracteres')
      .matches(RegExp.title)
      .withMessage('El título no cumple con el formato deseado')
      .trim(),

    body('author')
      .notEmpty()
      .withMessage('El autor de la publicación no puede estar vacío')
      .isMongoId()
      .withMessage('El id del usuario no es válido')
      .trim(),

    body('pet.name')
      .if(body('pet.name').exists())
      .notEmpty()
      .withMessage('El nombre del animal no puede estar vacío')
      .matches(RegExp.name)
      .withMessage('El nombre del animal no cumple con el formato deseado')
      .trim(),

    body('pet.gender')
      .notEmpty()
      .withMessage('El género del animal no puede estar vacío')
      .trim(),

    body('pet.age')
      .notEmpty()
      .withMessage('La edad del animal no puede estar vacío')
      .isNumeric()
      .withMessage('La edad del animal debe ser numérica')
      .isLength({ min: 1, max: 4 })
      .withMessage('La edad debe tener entre 1 y 4 dígitos')
      .matches(RegExp.age)
      .withMessage('La edad del animal no cumple con el formato deseado')
      .trim(),

    body('pet.ageTime')
      .notEmpty()
      .withMessage('El tiempo de edad del animal no puede estar vacío')
      .isString()
      .withMessage('El tiempo de edad no puede ser un número')
      .trim(),

    body('pet.colour')
      .if(body('pet.colour').exists())
      .notEmpty()
      .withMessage('El color del animal no puede estar vacío')
      .matches(RegExp.colour)
      .withMessage('El color del animal no cumple con el formato deseado')
      .trim(),

    body('pet.type')
      .notEmpty()
      .withMessage('El tipo de animal no puede estar vacío')
      .trim(),

    body('pet.species')
      .notEmpty()
      .withMessage('La especie del animal no puede estar vacío')
      .trim(),

    body('pet.quantity')
      .notEmpty()
      .withMessage('La cantidad de animales no puede estar vacío')
      .isNumeric()
      .withMessage('La cantidad de animales debe ser un valor numérico')
      .isLength({ min: 1, max: 4 })
      .withMessage('La cantidad de animales debe tener entre 1 y 4 dígitos')
      .matches(RegExp.age)
      .withMessage('La cantidad de animales no cumple con el formato deseado')
      .trim(),

    body('pet.characteristics')
      .if(body('pet.characteristics').exists())
      .notEmpty()
      .withMessage('Las características del animal no pueden estar vacías')
      .isLength({ min: 0, max: 250 })
      .withMessage(
        'Las características del animal no pueden superar los 250 caracteres'
      )
      .matches(RegExp.characteristics)
      .withMessage(
        'Las características del animal no cumple con el formato deseado'
      )
      .trim(),

    body('pet.adoptionConditions')
      .if(body('pet.adoptionConditions').exists())
      .notEmpty()
      .withMessage('Las condiciones de adopción no pueden estar vacías')
      .isLength({ min: 0, max: 250 })
      .withMessage(
        'Las condiciones de adopción no pueden superar los 250 caracteres'
      )
      .matches(RegExp.adoptionConditions)
      .withMessage(
        'Las condiciones de adopción no cumplen con el formato deseado'
      )
      .trim(),

    body('pet.location.country')
      .notEmpty()
      .withMessage('El país del animal no puede estar vacío')
      .trim()
      .matches(RegExp.soloLetras)
      .withMessage('El país del animal solo debe contener letras'),

    body('pet.location.city')
      .notEmpty()
      .withMessage('La ciudad del animal no puede estar vacía')
      .trim()
      .matches(RegExp.soloLetras)
      .withMessage('La ciudad del animal solo debe contener letras'),

    body('pet.location.address')
      .notEmpty()
      .withMessage('La dirección del animal no puede estar vacía')
      .trim(),
  ];
};

const postIdValidationRules = () => {
  return [
    param('id')
      .notEmpty()
      .withMessage('El id de la publicación no puede estar vacío')
      .isMongoId()
      .withMessage('El id de la publicación no es válido'),
  ];
};

const validate = (req, res, next) => {
  let errors = validationResult(req);
  let reqBodyVacio = false;
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  if (!req.params) {
    reqBodyVacio = Object.keys(req.body).length === 0;
  }
  if (reqBodyVacio) {
    errors = {
      success: false,
      msg: 'El cuerpo de la petición está vacio',
    };
    return res.status(400).send(errors);
  }
  next();
};

module.exports = { postValidationRules, postIdValidationRules, validate };
