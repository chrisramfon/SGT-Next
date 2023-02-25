var mysql = require('mysql');

const mysqlconnection = {}

mysqlconnection.conf = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "051097",
    database: "sgt"
});

module.exports = mysqlconnection;