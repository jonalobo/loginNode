const mysql = require('mysql');
const {connection} = require('../database/config');

const usertSelectRole = (data,callback) =>{
    let selectQuery = 'SELECT * FROM trole WHERE rol_code = ?';
    let query = mysql.format(selectQuery, data );
    connection.query(query, (err,result) => {
        if(err) throw err;
        callback(result[0]);   
    });
};

module.exports = {
    usertSelectRole
};

