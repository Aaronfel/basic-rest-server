const express = require('express');
const cors = require('cors');
const userRouter = require('../routes/user.routes');
const { dbConnection } = require('../db/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

    //Conect to database
    this.connectDB();

    //Middlewares
    this.middlewares();

    //Rutas de la app
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Reading and parse of the code
    this.app.use(express.json());

    // Public Directory
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usersPath, userRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto', this.port);
    });
  }
}

module.exports = Server;
