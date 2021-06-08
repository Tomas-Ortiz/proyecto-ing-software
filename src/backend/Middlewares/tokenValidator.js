const validateToken = (req, res, next) => {
  let result = {};
  const token = req.headers.authorization;
  if (!token) {
    result = {
      success: false,
      msg: 'Se debe enviar un token para obtener el usuario',
    };
    return res.status(401).send(result);
  }
  next();
};

module.exports = validateToken;
