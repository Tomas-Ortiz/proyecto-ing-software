const express = require('express');

const router = express.Router();

router.get('/register', (req, res) => {
  res.send('Página de register');
});

module.exports = router;
