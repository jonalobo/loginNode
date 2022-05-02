const mysql = require('mysql');
const {connection} = require('../database/config');

const usertSelectEmail = (data,callback) =>{
    let selectQuery = 'SELECT * FROM person WHERE per_email = ?';
    let query = mysql.format(selectQuery, data );
    connection.query(query, (err,result) => {
        if(err) throw err;
        callback(result[0]);
    });
};
const usertSelectId = (data,callback) =>{
    let selectQuery = 'SELECT * FROM person WHERE per_code = ?';
    let query = mysql.format(selectQuery, data );
    connection.query(query, (err,result) => {
        if(err) throw err;
        callback(result[0]);
    });
};
const userInsert = (data,callback) =>{
    let insertQuery = 'INSERT INTO person (per_name, per_lastname, per_email, per_password,per_nui,per_phone, per_address, per_role) VALUES (?,?,?,?,?,?,?,?)';
    let query = mysql.format(insertQuery, [data.name,data.lastname,data.email,data.password,data.nui,data.phone,data.address,data.role] );
    connection.query(query, (err,result) => {
        if(err) throw err;
        callback(result);
    });
   
};
const userUpdate = (data,callback) =>{
    let updateQuery = 'UPDATE person SET per_name=?, per_lastname=?, per_email=?, per_password=?,per_nui=?,per_phone=?, per_address=?, per_role=? WHERE per_code = ?';
    let query = mysql.format(updateQuery, [data.name,data.lastname,data.email,data.password,data.nui,data.phone,data.address,data.role,data.code]);
    connection.query(query, (err,result) => {
        if(err) throw err;
        callback(result);
    });
};
const usersSelect = (callback) =>{
    let selectQuery = 'SELECT * FROM person WHERE per_status = 1';
    connection.query(selectQuery, (err,result) => {
        if(err) throw err;
        callback(result);
    });
};
const userSelect = (data,callback) =>{
    let selectQuery = 'SELECT * FROM person WHERE per_code = ?';
    let query = mysql.format(selectQuery, data);
    connection.query(query, (err,result) => {
        if(err) throw err;
        callback(result);
    });
};
const userDelete = (data,callback) =>{
    let selectQuery = 'UPDATE person SET per_status = 0 WHERE per_code = ?';
    let query = mysql.format(selectQuery, data);
    connection.query(query, (err,result) => {
        if(err) throw err;
        callback(result);
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