var mysql = require('mysql');
var dbconfig = require('./models/database');

// make connection to database
var connection = mysql.createConnection(dbconfig.connection);

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

// CREATE Individual_User_Info database
connection.query('CREATE ')

// connection.query('USE ' + dbconfig.database);

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
    `email` VARCHAR(60) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC), \
    UNIQUE INDEX `email_UNIQUE` (`email` ASC) \
)');



console.log('Success: Database Created!')

connection.end();
