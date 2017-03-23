// configure database information
exports = module.exports = {};

exports.connection = {
    'host'  : 'localhost',
    'user'  : 'root',
    'password': '00000000'
};

exports.connection.Individual_User_Info = {
  'database': 'Individual_User_Info',
  'table'   : 'individual_user'
};

exports.connection.Host_User_Info = {
  'database': 'Host_User_Info',
  'table'   : 'host_user'
};

exports.connection.Individual_User_Profile = {
  'database' : 'Individual_User_Info',
  'table1'   : 'schedule',
  'table2'   : 'past_activity',
  'talbe3'   : 'moment',
  'table4'   : 'follow'
}

exports.connection.Activity = {
  'database' : 'Individual_User_Info',
  'table1'   : 'activity_comment',
  'table2'   : 'activity_info',
  'table3'   : 'activity_rating'
}
