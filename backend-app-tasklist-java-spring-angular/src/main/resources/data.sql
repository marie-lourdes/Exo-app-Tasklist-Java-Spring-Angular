CREATE TABLE task( 
id int NOT NULL AUTO_INCREMENT  PRIMARY KEY,
completed boolean ,
title VARCHAR(150),
date DATE  
);

INSERT INTO task(completed,title,date ) VALUES (false, 'test bdd', '16-02-2025');
