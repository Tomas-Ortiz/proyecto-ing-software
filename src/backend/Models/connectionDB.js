const mongoose = require('mongoose');

// Configuración y conexión a mongoDB

const host = 'localhost';
const dbName = 'puppers';
const uri = `mongodb://${host}/${dbName}`;

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

mongoose.connect(uri, (error, db) => {
  if (error) {
    throw error;
  }
  console.log(`Conectado a la bd ${db.name} en ${db.host}:${db.port}`);
});

module.exports = mongoose;
