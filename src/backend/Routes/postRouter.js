const express = require('express');
const { upload, validateTotalSize } = require('../Middlewares/multer');
const controller = require('../Controllers/postController');
const {
  postValidationRules,
  postIdValidationRules,
  validate,
} = require('../Middlewares/postValidator');

const router = express.Router();

router.post(
  '/create-post',
  postValidationRules(),
  validate,
  controller.createPost
);

router.post(
  '/upload-images',
  upload.array('files', 5),
  validateTotalSize,
  controller.uploadImages
);

router.get(
  '/get-post/:id',
  postIdValidationRules(),
  validate,
  controller.getPost
);

router.get('/get-posts', controller.getPosts);

module.exports = router;
