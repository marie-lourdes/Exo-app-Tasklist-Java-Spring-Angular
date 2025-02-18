CREATE TABLE task( 
id int NOT NULL AUTO_INCREMENT  PRIMARY KEY,
completed boolean ,
title VARCHAR(150),
description VARCHAR(150),
date DATE  
);

INSERT INTO task(completed,title,description,date ) VALUES (false, 'test bdd','description tache','2025-02-16');
