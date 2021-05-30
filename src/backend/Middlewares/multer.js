const path = require('path');
const multer = require('multer');
const crypto = require('crypto');

// Con multer se especifica el destino y nombre del archivo, y se lo valida
const multerStorage = multer.diskStorage({
  destination: path.resolve(__dirname, '../../frontend/public/images/posts'),
  filename: (req, file, cb) => {
    const filename = `post-${crypto
      .randomBytes(10)
      .toString('hex')}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});
// en cb(), true = archivo aceptado - false = archivo no aceptado
const multerFilter = (req, file, cb) => {
  if (!file.mimetype.includes('image')) {
    return cb('Los archivos subidos deben ser una imagen', false);
  }
  cb(null, true);
};

const validateTotalSize = (req, res, next) => {
  const totalSize = Object.values(req.files).reduce((total, { size }) => {
    return total + size;
  }, 0);
  if ((totalSize / 1024 / 1024).toFixed(2) > 10) {
    return res.status(400).send('Las imágenes no pueden superar los 10 MB');
  }
  next();
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = { upload, validateTotalSize };
