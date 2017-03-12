var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '00000000',
	database: 'Individual_User_Info'
});

connection.connect();

var username = 'testing';

var query = connection.query('select * from individual_user where username = ?',  username, function (err,result){
	console.log(result);
})
