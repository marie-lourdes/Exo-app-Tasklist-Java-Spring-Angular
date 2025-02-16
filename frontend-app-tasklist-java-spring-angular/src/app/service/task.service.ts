import { Injectable,OnInit,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BASE_URL_API} from '../../environments/app.token';

//interface  cree pour l objet Task au lieu d une couche model avec une class Task
/*Contrat de structure : Une interface définit un contrat que les objets doivent respecter. Cela garantit que les objets ont une structure cohérente,
ce qui facilite la maintenance et la compréhension du code.
Vérification de type : TypeScript utilise les interfaces pour effectuer la vérification de type à la compilation.
Cela permet de détecter les erreurs potentielles avant l'exécution du code.  */

   export interface Task {
     id?: number;
     title: string;
     completed: boolean;
     date: string; // Format: YYYY-MM-DD
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
export class  TaskService implements OnInit {
  //api vec springboot
 // private apiUrl = inject(BASE_URL_API);

  // initialisation de l'objet HttpClient
  constructor(private http: HttpClient, @Inject(BASE_URL_API) private apiUrl: string) {
     console.log('Base URL:', this.apiUrl);

  }

 /* L'utilisation de la méthode ngOnInit dans Angular est recommandée pour les opérations d'initialisation qui ne doivent être effectuées qu'une seule fois au cours du cycle de vie d'un composant.
   Cela permet de s'assurer que les données requises pour le composant sont disponibles avant que celui-ci ne soit affiché à l'écran.
  En faisant la requête dans la méthode ngOnInit, vous pouvez être sûr que les données sont chargées avant que le composant ne soit rendu, ce qui évite des erreurs potentielles lors de l'affichage de données manquantes ou non actualisées. Cela peut également aider à améliorer les performances en évitant d'exécuter des opérations inutiles ou coûteuses en temps d'exécution.*/

  ngOnInit () {
   this.getTasks().subscribe();
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
  getTasksByDate(date: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/${date}`);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

}
