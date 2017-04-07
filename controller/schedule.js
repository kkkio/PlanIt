var express = require('express');
var schedule = require('../models/schedule');
exports = module.exports = {};

exports.myschedule= function mymoment(req,res,next){
	var data[];
	data=Schedule.showMySchedule(req.cookies.u_id);
	res.render('myschedule',data);
};
