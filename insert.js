// insert new tuples to tables in databases
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

//add new tuples
var individual_user = ({
	username: 'testing',
	password: 	'123456',
	email:	 	'testing@gmail.com',
	phone_number: '85212345678',
	self_intro: 'I am testing testing',
	num_of_followers: '0',
	num_of_following: '0'
});

var query = connection.query('insert into individual_user set ?', individual_user, function (err, result){
	if (err){
		console.error(err);
		return;
	}
	console.error(result);
});
