-- register as individual user
-- need to check what information has been entered
-- if not summited,
-- store ip1 only, and ignore other ip
INSERT INTO Individual_User_Info.individual_user
	(username, password, email, phone_number, num_of_followers, num_of_following, user_ip1)
	values('username', 'password', 'phone_number','email', '0', '0', 'ip_address');

-- DONE --
-- individual user login: input username and retrieve password, username unique
SELECT i.password
FROM Individual_User_Info.individual_user i
WHERE i.username = 'username';

-- DONE --
-- individual user login: input email and retrieve password, email unique
SELECT i.password
FROM Individual_User_Info.individual_user i
WHERE i.email = 'email';

-- DONE --
-- ip check: input username and retrieve ip addresses, return 1 if the current_ip is in the recent 3 ip address
SELECT CASE WHEN EXISTS (
    SELECT *
    FROM Individual_User_Info.individual_user i
    WHERE i.username = 'username'
    AND (i.user_ip1 = 'current_ip' OR i.user_ip2 = 'current_ip' OR i.user_ip3 = 'current_ip')
)
THEN 1
ELSE 0
END;

-- DONE --
-- reset password from "Forget Password" link: input email and update password
UPDATE Individual_User_Info.individual_user
SET password = 'new_password'
WHERE email = 'email';

-- NOT IN MODEL IN CONTROL LEVEL --
-- follow people: input user_id, followed_id and update record
INSERT INTO Individual_User_Profile.follow
	(follower_id, followed_id)
	values('user_id', 'followed_id');

UPDATE Individual_User_Info.individual_user
SET num_of_following = num_of_following + 1
WHERE user_id = 'user_id';

UPDATE Individual_User_Info.individual_user
SET num_of_followers = num_of_followers + 1
WHERE user_id = 'followed_id';

-- add event into schedule: input user_id, title, activity_id and privacy
-- title can be self-defined by the user or save as the activity name
INSERT INTO Individual_User_Profile.schedule
	(user_id, title, activity_id, s_date, start_time, end_time, venue, privacy, url)
SELECT 'user_id','title', 'activity_id', s_date, start_time, end_time, venue, 'privacy',url
FROM Activity.activity_info
WHERE activity_id = 'activity_id';

-- retrieve activity list in schedule: input user_id
SELECT s.title, s.s_date, s.start_time, s.end_time, s.venue, s.url
FROM Individual_User_Profile.schedule s
WHERE s.user_id = 'user_id';

-- retrieve friend's schedule
-- need to check privacy: input user_id and friend_id, return 1 if they are friends
-- if condition: check whether two users are friends
SELECT CASE WHEN EXISTS (
    SELECT *
    FROM Individual_User_Profile.follow f1
    WHERE f1.follower_id = 'user_id' AND f1.followed_id = 'friend_id'
)
AND EXISTS(
	SELECT *
	FROM Individual_User_Profile.follow f2
	WHERE f2.follower_id = 'friend_id' AND f2.followed_id = 'user_id'
)
THEN 1
ELSE 0
END;

-- if 1, then retrieve friend's schedule info
SELECT s.title, s.s_date, s.start_time, s.end_time, s.venue, s.url
FROM Individual_User_Profile.schedule s
WHERE s.user_id = 'friend_id' AND s.privacy <> 'private';


-- else
-- need to check privacy: input user_id and friend_id, return 1 if user follows friend
--     if condition: check whether the user is following the friend
SELECT CASE WHEN EXISTS (
    SELECT *
    FROM Individual_User_Profile.follow f1
    WHERE f1.follower_id = 'user_id' AND f1.followed_id = 'friend_id'
)
THEN 1
ELSE 0
END;

--    if 1, then retrieve the schedule of people who the user is following
SELECT s.title, s.s_date, s.start_time, s.end_time, s.venue, s.url
FROM Individual_User_Profile.schedule s
WHERE s.user_id = 'friend_id' AND (s.privacy = 'followers' or s.privacy = 'public');

--    else, only retrieve schedules that are available to the public
-- retrieve only schedule for public
SELECT s.title, s.s_date, s.start_time, s.end_time, s.venue, s.url
FROM Individual_User_Profile.schedule s
WHERE s.user_id = 'friend_id' AND s.privacy = 'public';
--    end if
-- end if

-- add past activity: input user_id, activity_id, current_date, current_time, and check existence in schedule
-- if return 1, then insert
SELECT CASE WHEN EXISTS (
    SELECT *
    FROM Individual_User_Profile.schedule s
    WHERE s.user_id = 'user_id' AND s.activity_id = 'activity_id' AND (s.s_date < 'current_date' OR (s.s_date = 'current_date' and s.end_time < 'current_time')
)
THEN 1
ELSE 0
END;

INSERT INTO Individual_User_Profile.past_activity
		(user_id, activity_id)
		values ('user_id', 'activity_id');

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --  host user -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- register as host user
-- need to check input length
INSERT INTO Host_User_Info.host_user
	(username, company_name, password, email, host_ip1)
	values('username', 'company_name', 'password', 'email','host_ip1');

-- host user login: input username and retrieve password
SELECT h.password
FROM Host_User_Info.host_user h
WHERE h.username = 'username';

-- ip check: input username and retrieve ip addresses, return 1 if the current_ip is in the recent 3 ip address
SELECT CASE WHEN EXISTS (
    SELECT *
    FROM Host_User_Info.host_user i
    WHERE i.username = 'username'
    AND (i.user_ip1 = 'current_ip' OR i.user_ip2 = 'current_ip' OR i.user_ip3 = 'current_ip')
)
THEN 1
ELSE 0
END;

-- reset password from "Forget Password" link: input email and update password
UPDATE Host_User_Info.host_user
SET password = 'new_password'
WHERE email = 'email';

-- host user homepage: input host user id and retrieve activity list with comments and ratings

SELECT a.activity_name, a.a_date, a.start_time, a.end_time, a.venue, a.activity_intro, a.url, a.average_rating, c.comment_text, c.post_date, c.post_time, c.useful, c.not_useful
FROM Activity.activity_info a
LEFT OUTER JOIN Activity.activity_comment c ON a.activity_id = c.activity_id
WHERE a.host_id = 'user_id';

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --  activity -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- post activity
INSERT INTO Activity.activity_info
	(host_id, activity_name, a_date, start_time, end_time, venue, activity_intro, url, category)
	values('host_id', 'activity_name', 'a_date', 'start_time', 'end_time', 'venue', 'activity_intro', 'url', 'category');

-- search activity by keywords
SELECT *
FROM Activity.activity_info i
	LEFT OUTER JOIN Activity.activity_comment c
	ON i.activity_id = c.activity_id
WHERE MATCH (i.activity_intro) AGAINST('keywords') OR MATCH (i.activity_name) AGAINST('keywords');
-- search activity by recommandation

-- post comment: input user_id and activity_id
-- need to check user_id and activity_id in past activities, if not in past_activity, return false
SELECT CASE WHEN EXISTS (
    SELECT *
    FROM Individual_User_Profile.past_activity p
    WHERE p.user_id = 'user_id' AND p.activity_id = 'activity_id'
)
THEN 1
ELSE 0
END;

INSERT INTO Activity.activity_comment
		(user_id, activity_id, comment_text, post_date, post_time, useful, not_useful)
		values ('user_id', 'activity_id', 'comment_text', 'post_date', 'post_time', '0', '0');

-- rate comment as useful or not useful
UPDATE Activity.activity_comment
SET useful = useful + 1
WHERE comment_id = 'comment_id';

UPDATE Activity.activity_comment
SET not_useful = not_useful + 1
WHERE comment_id = 'comment_id';

-- post rating: inout user_id and activity_id, update record and average rating
INSERT INTO Activity.activity_rating
	(user_id, activity_id, rating)
	values ('user_id', 'activity_id', 'rating');

UPDATE Activity.activity_info i
SET i.average_rating =
	(SELECT AVG(r.rating)
	FROM Activity.activity_rating r
	WHERE i.activity_id = r.activity_id AND i.activity_id = 'activity_id');
