CREATE TABLE task( 
id int NOT NULL AUTO_INCREMENT  PRIMARY KEY,
status ENUM('PENDING','COMPLETED')  DEFAULT  'PENDING',
title VARCHAR(150),
description VARCHAR(150),
date DATE  
);

INSERT INTO task(status,title,description,date ) VALUES ('PENDING', 'test bdd avec mois anterieur au mois  courant ','description tache','2025-02-16');
INSERT INTO task(status,title,description,date ) VALUES ('PENDING', 'test bdd','description tache','2025-03-16');
INSERT INTO task(status,title,description,date ) VALUES ('COMPLETED', 'test ENUM','description tache','2025-05-16');

