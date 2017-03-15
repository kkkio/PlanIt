var mysql = require('mysql');
var db = require('./database');

// connet to user database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '00000000',
  database : 'Individual_User_Info'
});

connection.connect();

module.exports = {
  findUserbyid: function(id,callback){
    connection.query('SELECT * FROM user WHERE id = ?',id,callback)
  }
  
}
