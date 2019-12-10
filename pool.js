const mysql = require('mysql');
const util = require('util');

//Connection Database MySQL
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'usergesan',
    port: 3306,
    database: 'cosa'
});

pool.connect(err => {
    if (!err) {
        console.log("DB Connection Succeeded");
    } else {
        console.log("DB Connection Failed");
    }
});

pool.query = util.promisify(pool.query);


module.exports = pool;