CREATE TABLE task( 
id int NOT NULL AUTO_INCREMENT  PRIMARY KEY,
completed boolean ,
title VARCHAR(150),
description VARCHAR(150),
date DATE  
);

INSERT INTO task(completed,title,description,date ) VALUES (false, 'test bdd avec mois anterieur au mois  courant ','description tache','2025-02-16');
INSERT INTO task(completed,title,description,date ) VALUES (false, 'test bdd','description tache','2025-03-16');
INSERT INTO task(completed,title,description ) VALUES (false, 'test  tache sans date dans la liste de tache de l agenda','description tache');
