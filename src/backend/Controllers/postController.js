const Post = require('../Models/Post');

const postController = {
  createPost: async (req, res) => {
    let result = {};
    try {
      const post = new Post(req.body);
      const savedPost = await post.save();
      result = {
        success: true,
        msg: '¡Genial, publicación creada!',
        postId: savedPost._id,
      };
      return res.status(200).send(result);
    } catch (err) {
      result = { success: false, msg: err.message };
      return res.status(400).send(result);
    }
  },

  uploadImages: async (req, res) => {
    let result = {};
    try {
      const images = [];
      const { postId } = req.body;
      Object.values(req.files).forEach((file) => {
        images.push({
          name: file.filename,
          type: file.mimetype,
          size: file.size,
          path: file.path,
        });
      });
      await Post.updateOne(
        { _id: postId },
        { $set: { 'pet.images': images } }
      ).orFail();
      result = { success: true, msg: '¡Genial, publicación creada!' };
      return res.status(200).send(result);
    } catch (err) {
      result = { success: false, msg: err.message };
      return res.status(400).send(result);
    }
  },

  getPost: async (req, res) => {
    let result = {};
    try {
      const { id } = req.params;
      const post = await Post.findOne({ _id: id }).orFail();
      result = { success: true, post };
      return res.status(200).send(result);
    } catch (err) {
      result = { success: false, msg: err.message };
      return res.status(400).send(result);
    }
  },
};

module.exports = postController;
