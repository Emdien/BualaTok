var mysql = require('mysql2');

var conexion = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'bualatok'
});

module.exports = conexion;