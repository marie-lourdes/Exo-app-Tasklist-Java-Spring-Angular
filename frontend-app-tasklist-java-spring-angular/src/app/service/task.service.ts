import { Injectable,OnInit,Inject,WritableSignal, signal } from '@angular/core';
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
     description?: string;
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
  // TO DO: remplacer les données task par les Signal Angular et evite des fuites de memoire
  // Signal contenant toutes les tâches
  private tasks: WritableSignal<Task[]> = signal([]);

 /* -L'utilisation de la méthode ngOnInit dans Angular est recommandée pour les opérations d'initialisation qui ne doivent être effectuées qu'une seule fois au cours du cycle de vie d'un composant.
   Cela permet de s'assurer que les données requises pour le composant sont disponibles avant que celui-ci ne soit affiché à l'écran.
  En faisant la requête dans la méthode ngOnInit, vous pouvez être sûr que les données sont chargées avant que le composant ne soit rendu, ce qui évite des erreurs potentielles lors de l'affichage de données manquantes ou non actualisées. Cela peut également aider à améliorer les performances en évitant d'exécuter des opérations inutiles ou coûteuses en temps d'exécution.
     Charger toutes les tâches pour un usage global dans l'application ?
     - Utilisez le `constructor`.
     - C'est approprié lorsque les tâches doivent être disponibles dès le chargement initial de l'application ou lorsqu'elles sont partagées à travers plusieurs fonctionnalités dans l'application.

  */

  // initialisation de l'objet HttpClient
  constructor(private http: HttpClient, @Inject(BASE_URL_API) private apiUrl: string) {
     console.log('Base URL:', this.apiUrl);
     this.loadTasks(); // Charger les tâches initiales
  }

  ngOnInit () {
   //this.loadTasks();
  }

  createTask(task: Task): void {
     this.http.post<Task>(`${this.apiUrl}/save`, task).subscribe(
      (newTask) =>{
        this.tasks.update((tasks) => [...tasks, newTask]);
      });
  }

/* refactoring: déplacer l'appel `confirm` directement dans l'abonnement `subscribe` du service
via un call back en parametre de la methode update et garder un affichage reactif du nombre de taches completed
Permet de s assurer les mises à jour asynchrones ont été effectuées avant d'informer le composant ou l'utilisateur des changements.
*/
  updateTask(task: Task,onComplete: () => void) : void {
    this.http.put<Task>(`${this.apiUrl}/update/${task.id}`, task).subscribe(
       (updatedTask)=> {
         /*- Attention il s agit de la méthode native **JavaScript Array.map()**.
           - Elle itère sur chaque element du  tableau (les tâches, `Task[]`) pour les  transformer et retourner un nouveau tableau.
           - Ce n'est pas l'opérateur `map`( avec pipe()) d'RxJS, qui aurait été utilisé avec des `Observable`.*/

         this.tasks.update((tasks)=>
           tasks.map((t)=> (t.id === updatedTask.id ? updatedTask : t ))
         );
         // Appeler le callback après la mise à jour
           onComplete();

       });
  }

  deleteTask(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/delete/${id}`).subscribe(
      ()=> {
        this.tasks.update((tasks) => tasks.filter((t)=>
          t.id !== id));
    });
  }

  getTasksByDate(date: string | null): WritableSignal<Task[]> {
    // Créer un signal pour contenir les tâches par date
    const tasksByDate: WritableSignal<Task[]> = signal([]);
   // Effectuer la requête HTTP et mettre à jour le Signal
   this.http.get<Task[]>(`${this.apiUrl}/details/${date}`).subscribe({
     next: (tasks) => tasksByDate.set(tasks),
     error: (err) => console.error('Error fetching tasks by date:', err)
   });
  // Retourner le Signal pour utiliser dans le composant Agenda
   return tasksByDate;

  }

 //obtenir les tâches par mois.
 getTasksForMonth(startOfMonth: string, endOfMonth: string): Observable<Task[]> {
   return this.http.get<Task[]>(
     `${this.apiUrl}/tasks?start=${startOfMonth}&end=${endOfMonth}`
   );
 }

// Obtenez les tâches sous forme de signal
  getTasks(): WritableSignal<Task[]> {
    return this.tasks;
  }


// Charger à partir du backend et setter dans le signal
   loadTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe(
      (tasks)=> {
        this.tasks.set(tasks); // Mettre à jour le contenu du signal
        });
  }



/************************************!!!!!!!!!!!!!!!!*************************************
 ### Utilisation d'un Observable d un writableSignal dans la methode getTasksForMonth(startOfMonth: string, endOfMonth: string)
 (et pas un Signal)**
 #### **1. Rôle attendu de `getTasksForMonth`**
 La méthode `getTasksForMonth` semble être conçue comme **un point de récupération ponctuelle (stateless)** :
 - Elle retourne les tâches correspondant à des dates spécifiques (`startOfMonth`, `endOfMonth`) à partir de l'API backend.
 - Elle **ne maintient pas les données en mémoire** dans le service et les laisse au choix du consommateur de garder ou non cet état.

 Un signal ici serait inutile si le but est **uniquement de récupérer un sous-ensemble de tâches** sans gérer leur conservation à long terme.
 #### **2. Gestion d'un contexte local (localized state)**
 Lorsqu'on veut juste afficher les tâches d'un mois donné dans un composant, il est plus logique de :
 1. Récupérer les données avec un `Observable`.
 2. Laisser le **composant consommateur** décider de stocker ces données localement (ou non).

 Implémentation typique :
 ``` typescript
 this.loading = true;
 this.taskService.getTasksForMonth(start, end).subscribe({
   next: (tasks) => {
     this.monthTasks = tasks; // Stockage local ou affichage
     this.loading = false;
   },
   error: () => {
     this.loading = false;
     // Gestion d'erreurs
   }
 });
 ```
 Dans ce cas, utiliser un `signal` au niveau du service demanderait d'imposer une gestion globale de l'état que tous les composants devraient respecter — ce qui peut être inutilement complexe si ce n'est pas partagé entre plusieurs parties de l'application.
 #### **3. Quand un Observable est plus flexible**
 Un Observable permet :
 - **De ne pas centraliser les données dans le service** si ce n'est pas nécessaire.
 - **De gérer des appels spécifiques** : Récupérer différents ensembles de tâches sans impact sur l'état global.

 Par exemple :
 ``` typescript
 this.tasksMonday$ = this.taskService.getTasksForMonth('2023-11-01', '2023-11-30');
 this.tasksSunday$ = this.taskService.getTasksForMonth('2023-12-01', '2023-12-31');
 ```
 Avec un `Signal` partagé, ces deux appels modifieraient **le même état partagé**, ce qui rendrait la gestion des tâches par contexte plus difficile.
 ### **Pourquoi et quand utiliser un Signal à la place**
 Cependant, un `Signal` pourrait être une bonne alternative si :
 1. **Les données des tâches du mois actuel/de l'application doivent être partagées entre plusieurs composants.**
     - Par exemple, si plusieurs vues doivent accéder **en temps réel** aux mêmes tâches filtrées via une navigation mensuelle.

 2. **Tu veux centraliser et conserver une copie réactive des tâches à long terme.**
     - Le `Signal` fonctionne comme un cache local qui évite de répéter les appels au backend.

 3. **Tu veux une interface utilisateur réactive (unbinding automatique).**
     - Par exemple, si les tâches du mois changent dynamiquement en fonction des modifications de date ou de vue.
*/
}
