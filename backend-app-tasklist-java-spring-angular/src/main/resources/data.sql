CREATE TABLE task( 
id int NOT NULL AUTO_INCREMENT  PRIMARY KEY,
completed boolean ,
title VARCHAR(150) 
);

INSERT INTO task(completed,title ) VALUES (false, 'test bdd');
