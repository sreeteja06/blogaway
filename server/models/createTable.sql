CREATE TABLE userTable ( userid INT PRIMARY KEY, name VARCHAR(20) NOT NULL, email VARCHAR(20) NOT NULL );

CREATE TABLE articleTable ( articleID INT PRIMARY KEY AUTO_INCREMENT,content TEXT NOT NULL, title VARCHAR(20) NOT NULL, descript VARCHAR(20) NOT NULL, likes INT DEFAULT 0, authorID INT NOT NULL, FOREIGN KEY (authorID) REFERENCES userTable(userid), tsp DATE);

CREATE TABLE followersTable ( userid INT NOT NULL, FOREIGN KEY ( userid )REFERENCES userTable(userid) , followersid INT NOT NULL, FOREIGN KEY ( followersid ) REFERENCES userTable(userid) );

CREATE TABLE followingTable ( userid INT NOT NULL, followingid INT NOT NULL, FOREIGN KEY ( followingid ) REFERENCES userTable(userid) );

CREATE TABLE comments (commentID INT PRIMARY KEY, comment TEXT NOT NULL, authorID INT NOT NULL,  FOREIGN KEY ( authorID ) REFERENCES userTable(userid), articleID INT NOT NULL, FOREIGN KEY ( articleID ) REFERENCES articleTable(articleID), commentLikes INT DEFAULT 0);

create table articleLikes (articleid int not null, FOREIGN key ( articleid ) references articletable( articleid ), userid int not null,foreign key (userid) references usertable(userid), UNIQUE KEY user_article_uk (articleid, userid));

create table commentLikes (commentID int not null, FOREIGN key ( commentID ) references comments( commentID ), userid int not null,foreign key (userid) references usertable(userid), UNIQUE KEY user_article_uk (commentID, userid));

INSERT INTO userTable VALUES(211, 'sree', 'sree@gmail.com');
INSERT INTO articleTable (content, title, descript, authorID, tsp) values('hey there this is the body of the post', 'hello', 'description', 211, now());
