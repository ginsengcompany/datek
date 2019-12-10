const mysql = require('../pool');
const bcrypt = require('bcrypt');

function User() {};

User.prototype = {
    //Find user  by id or username
    find: function(user = null, callback) {
        //if user = number return field = id, if user = string return field = username.
        if(user) {
            var field = Number.isInteger(user) ? 'id' : 'username';
        }
            let sql = `SELECT * FROM users WHERE ${field} = ? AND attivo = 1`;
            mysql.query(sql, user, function (err, result) {
                if(err) throw err
                callback(result);
            });
    },
    create: function(body, callback) {
        const pwd = bcrypt.hashSync(body.password,10);
        const username = body.username;
        const email = body.email;
        let sql = `INSERT INTO users(username, email, password) VALUES (?, ?, ?)`;
        mysql.query(sql, [username, email, pwd], function (err, result) {
            if(err){
                callback(null);
            }else{
                callback(email)
            }
        });
    },

    login: function (username, password, callback) {
        this.find(username, function (users) {
           if(users && users.length > 0){
               const user = users[0];
               if(bcrypt.compareSync(password, user.password)){
                   callback(user);
                   return;
               }
           }
           callback(null);
        });
    },
    newPassword: function (email, password, callback) {
        const pwd = bcrypt.hashSync(password,10);
        let sql = 'UPDATE users SET password = ? WHERE email = ?';
        mysql.query(sql, [pwd, email], function (err, result) {
            callback(err);
        });
    },
    active: function (email, callback) {
        let sql = 'UPDATE users SET attivo = 1 WHERE email = ?';
        mysql.query(sql, [email], function (err, result) {
            callback(err);
        });
    }
}

module.exports = User;