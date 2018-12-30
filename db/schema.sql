 CREATE DATABASE burgers_db;

 USE burgers_db;
 CREATE table burgers
 (
     id int NOT NULL AUTO_INCREMENT,
     burger_name varchar(25) NOT NULL,
     devoured BOOLEAN DEFAULT false,
     PRIMARY KEY (id)
 );