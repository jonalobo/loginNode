const mysql = require('mysql');
const {connection} = require('../database/config');

function usertSelectEmail(data) {
    return new Promise((resolve, reject) => {
    let selectQuery = 'SELECT * FROM person WHERE per_email = ?';
    let query = mysql.format(selectQuery, data );
    connection.query(query, (err,result) => {    
        // si ocurre error en la consulta, rechazamos la Promesa
        if (err) return reject(error); // devolvemos una Promesa rechazada pasando como argumento el error recibido
        // Si la consulta devuelve resultados, resuelvo la promesa con los mismos
        return resolve(result[0]);
      });
    });
}
const usertSelectId = (data) =>{
    return new Promise((resolve, reject) => {
        let selectQuery = 'SELECT * FROM person WHERE per_code = ?';
        let query = mysql.format(selectQuery, data );
        connection.query(query, (err,result) => {    
            if (err) return reject(error); 
            return resolve(result[0]);
        });
    });
};
function userInsert(data) {
    return new Promise((resolve, reject) => {
    let insertQuery = 'INSERT INTO person (per_name, per_lastname, per_email, per_password,per_nui,per_phone, per_address, per_role) VALUES (?,?,?,?,?,?,?,?)';
    let query = mysql.format(insertQuery, [data.name,data.lastname,data.email,data.password,data.nui,data.phone,data.address,data.role] );
    connection.query(query, (err,result) => {  
        if (err) return reject(error);
            return resolve(result);
        });
    });
}
function userUpdate(data) {
    return new Promise((resolve, reject) => {
    let updateQuery = 'UPDATE person SET per_name=?, per_lastname=?, per_email=?, per_password=?,per_nui=?,per_phone=?, per_address=?, per_role=? WHERE per_code = ?';
    let query = mysql.format(updateQuery, [data.name,data.lastname,data.email,data.password,data.nui,data.phone,data.address,data.role,data.code]);
    connection.query(query, (err,result) => {  
        if (err) return reject(error);
            return resolve(result);
        });
    });
}
function usersSelect() {
    return new Promise((resolve, reject) => {
    let selectQuery = 'SELECT * FROM person WHERE per_status = 1';
    connection.query(selectQuery, (err,result) => {    
        if (err) return reject(error);
        return resolve(result);
      });
    });
}
function userSelect(data) {
    return new Promise((resolve, reject) => {
    let selectQuery = 'SELECT * FROM person WHERE per_code = ?';
    let query = mysql.format(selectQuery, data);
    connection.query(query, (err,result) => {  
        if (err) return reject(error);
            return resolve(result[0]);
        });
    });
}
const userDelete = (data) =>{
    return new Promise((resolve, reject) => {
        let updateQuery = 'UPDATE person SET per_status = 0 WHERE per_code = ?';
        let query = mysql.format(updateQuery, data );
        connection.query(query, (err,result) => {    
            if (err) return reject(error); 
            return resolve(result);
        });
    });
};

module.exports = {
    usertSelectEmail,
    usertSelectId,
    userInsert,
    userUpdate,
    usersSelect,
    userSelect,
    userDelete
};