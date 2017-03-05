-- Only used for PlanIt
-- Last modified: 05/03/2017 22:40
-- @author: Lily Li Danli

-- Brief description
-- There are totally 4 databases in PlanIt:
-- Individual_User_Info
-- Host_User_Info
-- Individual_User_Profile
-- Activity

-- Individual_User_Info database
-- Table individual_user stores basic personal information of all individual users
CREATE TABLE individual_user(
	user_id  	     INT 		     NOT NULL PRIMARY KEY AUTO_INCREMENT,
	username	     VARCHAR(20)     NOT NULL,
	password 	     VARCHAR(20)     NOT NULL,
	email	 	     VARCHAR(65)     NOT NULL,
	phone_number     VARCHAR(25),
	self_intro	     VARCHAR(300),
	num_of_followers INT 			 NOT NULL,
	num_of_following INT,
	propic_r	     INT,
	propic_g	     INT,
	propic_b	     INT,
	user_ip1	     INT UNSIGNED,
	user_ip2	     INT UNSIGNED,
	user_ip3	     INT UNSIGNED
);


-- Host_User_Info database
-- Table host_user stores basic host information of all host users
CREATE TABLE host_user(
	host_id			 INT 		     NOT NULL PRIMARY KEY AUTO_INCREMENT,
	username		 VARCHAR(20)	 NOT NULL,
	company_name	 VARCHAR(100)	 NOT NULL,
	password		 VARCHAR(20)	 NOT NULL,
	email 			 VARCHAR(65)	 NOT NULL,
	phone_number     VARCHAR(25),
	self_intro	     VARCHAR(300),
	propic_r	     INT,
	propic_g	     INT,
	propic_b	     INT,
	host_ip1 		 INT UNSIGNED,
	host_ip2		 INT UNSIGNED,
	host_ip3 		 INT UNSIGNED
);


-- Individual_User_Profile database
-- Table schedule stores all schedules of all individual users
CREATE TABLE schedule(
	schedule_id      INT  		     NOT NULL PRIMARY KEY AUTO_INCREMENT,
	user_id          INT 			 NOT NULL,
	title            VARCHAR(100)    NOT NULL,
	activity_id      INT,
	s_date	         DATE 	   	     NOT NULL,
	start_time       TIME,
	end_time         TIME,
	venue            VARCHAR(100),
	privacy          VARCHAR(7)	     NOT NULL CHECK (privacy IN ('public', 'private', 'all followers', 'all friends'))
					    			 DEFAULT 'all friends'
);

-- Table moment stores all moments of all individual users
CREATE TABLE moment(
	moment_id        INT  		     NOT NULL PRIMARY KEY AUTO_INCREMENT,
	user_id		     INT 			 NOT NULL,
	m_date           DATE 		     NOT NULL,
	post_time        TIME 		     NOT NULL,
	location         VARCHAR(50),
	moment_r         INT,
	moment_g         INT,
	moment_b         INT,
	m_text           VARCHAR(500),
	privacy          VARCHAR(13)	 NOT NULL CHECK (privacy IN ('public', 'private', 'all followers', 'all friends'))
				    				 DEFAULT 'public'
);

-- Table follow stores all "friends" & "followers" relationships among all individual users
CREATE TABLE follow(
	follower_id      INT  			 NOT NULL,
	followed_id      INT 			 NOT NULL,
	PRIMARY KEY (follower_id, followed_id)
);

-- Table past_activity stores all lists of past activities of all individual users
CREATE TABLE past_activity(
	user_id		     INT 			 NOT NULL,
	activity_id      INT 			 NOT NULL,
	PRIMARY KEY (user_id, activity_id)
);


-- Activity database
-- Table activity_info stores all detailed activity informaiton posted by host users
CREATE TABLE activity_info(
	activity_id      INT  		     NOT NULL PRIMARY KEY AUTO_INCREMENT,
	host_id 		 INT 			 NOT NULL,
	activity_name    VARCHAR(100)	 NOT NULL,
	a_date 			 DATE 			 NOT NULL,
	start_time 		 TIME 			 NOT NULL,
	venue 			 VARCHAR(100) 	 NOT NULL,
	activity_intro 	 VARCHAR(300),
	url 			 VARCHAR(100),
	category 		 VARCHAR(20)	 NOT NULL,
	average_rating   DECIMAL(3,1)	 NOT NULL CHECK (rating <= 10.0)
);

-- Table activity_comment stores all comments from all individual users
CREATE TABLE activity_comment(
	comment_id    	 INT 			 NOT NULL PRIMARY KEY AUTO_INCREMENT,
	user_id		     INT 			 NOT NULL,
	activity_id      INT 			 NOT NULL,			
	comment_text     VARCHAR(300)	 NOT NULL,
	post_date	     DATE 			 NOT NULL,
	post_time	     TIME 			 NOT NULL,
	useful 	  	     INT 			 NOT NULL,
	not_useful    	 INT 			 NOT NULL
);

-- Table activity_rating stores all ratings from all individual users
CREATE TABLE activity_rating(
	rating_id        INT 		     NOT NULL PRIMARY KEY AUTO_INCREMENT,
	user_id		     INT 			 NOT NULL,
	activity_id      INT 			 NOT NULL,
	rating 		     DECIMAL(3,1)	 NOT NULL CHECK (rating <= 10.0)
);