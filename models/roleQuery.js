const mysql = require('mysql');
const {connection} = require('../database/config');

function usertSelectRole(data) {
    return new Promise((resolve, reject) => {
    let selectQuery = 'SELECT * FROM trole WHERE rol_code = ?';
    let query = mysql.format(selectQuery, data );
    connection.query(query, (err,result) => {    
        // si ocurre error en la consulta, rechazamos la Promesa
        if (err) return reject(error); // devolvemos una Promesa rechazada pasando como argumento el error recibido
        // Si la consulta devuelve resultados, resuelvo la promesa con los mismos
        return resolve(result[0]);
      });
    });
}

module.exports = {
    usertSelectRole
};

