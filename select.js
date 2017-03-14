// retrieve data from database
// need to change password for mysql and database names when insert in different database
// change path of mysql temporarily
// PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/usr/local/mysql/bin
// start mysql
// mysql -h 127.0.0.1 -P 3306 -u root -p

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
