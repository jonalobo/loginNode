const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';
        //conectar a la base de datos
        this.conectarDB();
        //middlewares
        this.middlewares();
        //rutas de mi aplicación
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use(cors());
        //directorio publico
        this.app.use(express.static('public'));
        //lectura y parseo del body
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersPath, require('../routes/users'));
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        });
    }
    
}
module.exports = Server;