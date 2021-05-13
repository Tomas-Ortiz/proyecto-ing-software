const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectionDB = require('./Models/connectionDB');
const userRouter = require('./Routes/userRouter');

const server = express();

const port = 3000 || process.env.PORT;
server.set('port', port);

server.set('json spaces', 2);

// Middlewares
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Rutas
server.use('/', userRouter);

// Iniciar el servidor y ponerlo a la escucha
server.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Servidor escuchando en el puerto ${port}`);
});
