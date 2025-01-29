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

 // providedIn signifie a angular qu il sera charge a la racine de l application avec une seule et unique instance
 /*Singleton : En déclarant le service avec providedIn: 'root', Angular s'assure qu'une seule instance du service est créée et partagée dans toute l'application.
  Cela est utile pour des services qui gèrent des états partagés ou des ressources communes.
   Tree-shakable : Avec providedIn: 'root', Angular peut éliminer le service du bundle final si aucune partie de l'application ne l'utilise.
   Cela contribue à réduire la taille du bundle final.
   Simplicité : En utilisant providedIn: 'root', tu n'as pas besoin de déclarer explicitement le service dans le tableau providers d'un module, ce qui simplifie la gestion des services.*/
@Injectable({
  providedIn: 'root'
})
export class  TaskService{
  //api vec springboot
  private apiUrl = 'http://localhost:8080/api/tasks';
  // initialisation de l'objet HttpClient
  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
