#Test Case for Database queries
#register as individual user
INSERT INTO Individual_User_Info.individual_user
	(username, password, email, self_intro, num_of_followers, num_of_following, user_ip1)
	values('Eveline', '11111', 'eveline0422@gmail.com', 'hello','0', '0', '168172202');

INSERT INTO Individual_User_Info.individual_user
	(username, password, email, phone_number, self_intro, num_of_followers, num_of_following, user_ip1)
	values('Lily', '22222', 'lilylee19960516@gmail.com', '60915912','hiii','0', '0', '168172202'),
		('XD', '33333', 'dzhuocheng@gmail.com', '12345678','yes','0', '0', '168172202'),
		('ZZC', '44444', 'zzczjq96@gmail.com', '98765432','no','0', '0', '168172202'),
		('LYD', '55555', 'Kevin.l.yide@gmail.com', '52220678','don\'t know','0', '0', '168172202');

SELECT * FROM Individual_User_Info.individual_user;

#test duplicate email
INSERT INTO Individual_User_Info.individual_user
	(username, password, email, phone_number, self_intro, num_of_followers, num_of_following, user_ip1)
	values('testemail', '00000', 'Kevin.l.yide@gmail.com', '52220678','don\'t know','0', '0', '168172202');

#ERROR Message: ERROR 1062 (23000): Duplicate entry 'Kevin.l.yide@gmail.com' for key 'email'

#account management: update Eveline's phone number
UPDATE Individual_User_Info.individual_user
SET phone_number = '59832781'
WHERE username = 'Eveline';

#individual user login: input username and retrieve password, username unique
SELECT i.password
FROM Individual_User_Info.individual_user i
WHERE i.username = 'Eveline';

#individual user login: input email and retrieve password
SELECT i.password
FROM Individual_User_Info.individual_user i
WHERE i.email = 'eveline0422@gmail.com';

#ip check: input username and retrieve ip addresses, return 1 if the current_ip is in the recent 3 ip address
SELECT CASE WHEN EXISTS (
    SELECT *
    FROM Individual_User_Info.individual_user i
    WHERE i.username = 'Eveline'
    AND (i.user_ip1 = '000000' OR i.user_ip2 = '168172202' OR i.user_ip3 = '168172202')
)
THEN 1
ELSE 0
END;

#reset password from "Forget Password" link: input email and update password
UPDATE Individual_User_Info.individual_user
SET password = '11111'
WHERE email = 'eveline0422@gmail.com';

#follow people: input user_id, followed_id and update record
INSERT INTO Individual_User_Profile.follow
	(follower_id, followed_id)
	values('1', '2'),('1','3'),('1','4'),('1','5'),('2','1'),('3','4'),('4','3');

UPDATE Individual_User_Info.individual_user
SET num_of_following = '5', num_of_followers = '1'
WHERE user_id = '1';

UPDATE Individual_User_Info.individual_user
SET num_of_following = '1', num_of_followers = '1'
WHERE user_id = '2';

UPDATE Individual_User_Info.individual_user
SET num_of_following = '1', num_of_followers = '2'
WHERE user_id = '3';

UPDATE Individual_User_Info.individual_user
SET num_of_following = '1', num_of_followers = '2'
WHERE user_id = '4';

UPDATE Individual_User_Info.individual_user
SET num_of_following = '0', num_of_followers = '1'
WHERE user_id = '5';

#register as host users
INSERT INTO Host_User_Info.host_user
	(username, company_name, password, email, phone_number, host_ip1)
	values ('hkticket', 'HK Ticketing', '999999', 'hktic@gmail.com','29228288','168172202'),
		('hkart','HK Art Festival','123456','afgen@hkaf.org','28243555','168172202');

SELECT * FROM Host_User_Info.host_user;

#post activity
INSERT INTO Activity.activity_info
	(host_id, activity_name, a_date, start_time, end_time, venue, activity_intro, url, category)
	values('1', 'Joey Yung Music Concert', '20170326', '20:00:00', '24:00:00', 'HK Academy for Performing Arts', 'Joey Yung will hold 10 JOEY at the Performing Arts Opera House. MY SECRET. LIVE concert', 'http://www.tickethk.com/concert-ticket/1191', 'music concert'),
	('1', 'Joey Yung Music Concert', '20170331', '20:00:00', '24:00:00', 'HK Academy for Performing Arts', 'Joey Yung will hold 10 JOEY at the Performing Arts Opera House. MY SECRET. LIVE concert', 'http://www.tickethk.com/concert-ticket/1191', 'music concert'),
	('2','Beethoven Symphonies','20171101','20:00:00','22:00:00','Auditorium, Tsuen Wan Town Hall',	'The charismatic Venezuelan maestro Gustavo Dudamel and the legendary Simón Bolívar Symphony Orchestra of Venezuela (SBSOV) will bring audiences an unparalleled experience.', 'https://www.hk.artsfestival.org/en/programmes/dudamel-and-sbsov-beethoven-cycle/','music concert');

SELECT * FROM Activity.activity_info;

#add event into schedule: input user_id, title, activity_id and privacy
INSERT INTO Individual_User_Profile.schedule
	(user_id, title, activity_id, s_date, start_time, end_time, venue, privacy, url)
SELECT '1','Joey Yung', '1', i.a_date , i.start_time, i.end_time, i.venue, 'friends', i.url
FROM Activity.activity_info i
WHERE i.activity_id = '1';

INSERT INTO Individual_User_Profile.schedule
	(user_id, title, activity_id, s_date, start_time, end_time, venue, privacy, url)
SELECT '1','Joey Yung 2', '2', i.a_date , i.start_time, i.end_time, i.venue, 'private', i.url
FROM Activity.activity_info i
WHERE i.activity_id = '2';

INSERT INTO Individual_User_Profile.schedule
	(user_id, title, activity_id, s_date, start_time, end_time, venue, privacy, url)
SELECT '1','Beethoven', '3', i.a_date , i.start_time, i.end_time, i.venue, 'public', i.url
FROM Activity.activity_info i
WHERE i.activity_id = '3';

SELECT * FROM Individual_User_Profile.schedule;

#retrieve activity list in schedule: input user_id
SELECT s.title, s.s_date, s.start_time, s.end_time, s.venue, s.url
FROM Individual_User_Profile.schedule s
WHERE s.user_id = '1';

#retrieve friend's schedule 
#need to check privacy: input user_id and friend_id, return 1 if they are friends
SELECT CASE WHEN EXISTS (
    SELECT *
    FROM Individual_User_Profile.follow f1
    WHERE f1.follower_id = '2' AND f1.followed_id = '1'
)
AND EXISTS(
	SELECT *
	FROM Individual_User_Profile.follow f2
	WHERE f2.follower_id = '1' AND f2.followed_id = '2'
)
THEN 1
ELSE 0
END;

SELECT s.title, s.s_date, s.start_time, s.end_time, s.venue, s.url
FROM Individual_User_Profile.schedule s
WHERE s.user_id = '1' AND s.privacy <> 'private';

#need to check privacy: input user_id and friend_id, return 1 if user follows friend
SELECT s.title, s.s_date, s.start_time, s.end_time, s.venue, s.url
FROM Individual_User_Profile.schedule s
WHERE s.user_id = '1' AND (s.privacy = 'followers' or s.privacy = 'public');

#retrieve only schedule for public
SELECT s.title, s.s_date, s.start_time, s.end_time, s.venue, s.url
FROM Individual_User_Profile.schedule s
WHERE s.user_id = '1' AND s.privacy = 'public';

#add past activity: input user_id, current_date, current_time, and check existence in schedule

SELECT CASE WHEN EXISTS (
    SELECT *
    FROM Individual_User_Profile.schedule s
    WHERE s.user_id = '1' AND s.activity_id = '1' AND (s.s_date < '20170330' OR (s.s_date = '20170330' and s.end_time < '10:00:00'))
)
THEN 1
ELSE 0
END;

INSERT INTO Individual_User_Profile.past_activity (user_id, activity_id) values('1', '1');

#post comment: input user_id and activity_id
#need to check user_id and activity_id in past activities, if not in past_activity, return false
SELECT CASE WHEN EXISTS (
    SELECT *
    FROM Individual_User_Profile.past_activity p
    WHERE p.user_id = '1' AND p.activity_id = '1'
)
THEN 1
ELSE 0
END;

INSERT INTO Activity.activity_comment
		(user_id, activity_id, comment_text, post_date, post_time, useful, not_useful)
		values ('1', '1', 'excellent experience', '20170330', '15:30:00', '0', '0');

#rate comment as useful or not useful
UPDATE Activity.activity_comment
SET useful = useful + 1
WHERE comment_id = '1';

#post rating: inout user_id and activity_id, update record and average rating
INSERT INTO Activity.activity_rating
	(user_id, activity_id, rating)
	values ('1', '1', '8');

UPDATE Activity.activity_info i
SET i.average_rating = 
	(SELECT AVG(r.rating) 
	FROM Activity.activity_rating r 
	WHERE i.activity_id = r.activity_id AND i.activity_id = '1');


#host user homepage: input host user id and retrieve activity list with comments and ratings
 
SELECT a.activity_name, a.a_date, a.start_time, a.end_time, a.venue, a.activity_intro, a.url, a.average_rating, c.comment_text, c.post_date, c.post_time, c.useful, c.not_useful
FROM Activity.activity_info a 
LEFT OUTER JOIN Activity.activity_comment c ON a.activity_id = c.activity_id
WHERE a.host_id = '1';


#search activity by keywords
SELECT *
FROM Activity.activity_info i
	LEFT OUTER JOIN Activity.activity_comment c
	ON i.activity_id = c.activity_id
WHERE MATCH (i.activity_intro) AGAINST('Joey Yung') OR MATCH (i.activity_name) AGAINST('Joey Yung');














