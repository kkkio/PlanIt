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
var individual_user = function(req,res,err)
{
	username: req.username,
	password: 	req.password,
	email:	 	req.email,
	phone_number: req.phone_number,
	num_of_followers: '0',
	num_of_following: '0',
	ip1: req.user_ip1
};

var query = connection.query('insert into individual_user set ?', individual_user, function (err, result){
	if (err){
		console.error(err);
		return;
	}
	console.log(result);
});
