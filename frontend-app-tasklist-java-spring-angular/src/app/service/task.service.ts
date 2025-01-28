import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//interface  cree pour l objet Task au lieu d une couche model avec une class Task
/*Contrat de structure : Une interface définit un contrat que les objets doivent respecter. Cela garantit que les objets ont une structure cohérente,
ce qui facilite la maintenance et la compréhension du code.
Vérification de type : TypeScript utilise les interfaces pour effectuer la vérification de type à la compilation.
Cela permet de détecter les erreurs potentielles avant l'exécution du code.  */

   export interface Task {
     id?: number;
     title: string;
     completed: boolean;
   }
@Injectable({
  providedIn: 'root'
})
export class  {
  //api vec springboot
  private apiUrl = 'http://localhost:8080/api/tasks';
  // initialisation de l'objet HttpClient
  constructor(private http: HttpClient) { }
}
