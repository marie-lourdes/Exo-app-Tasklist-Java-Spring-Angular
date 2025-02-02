import { Component,OnInit, signal, computed } from '@angular/core';
import { TaskService, Task } from '../service/task.service';
import {CommonModule} from '@angular/common';
// pour ngModel!!! le formModule doit etre importe dans le component qui l utilise et pas dans le app.module  selon l exo
import {FormsModule } from '@angular/forms'; // Importer FormsModule

@Component({
  selector: 'app-task-list',
  imports: [CommonModule,FormsModule ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit{
   // Signal contenant toutes les tâches
    tasks = signal<Task[]>([]);

  //tasks : Task[]= [];
  // tasksCompleted: Task[]= [];
  // isTaskCompleted = signal(false);

  //on cree des donne vide et par defaut pour le template a remplir de l ajout d un task
  newTask : Task = {title:'', completed:false};
  //color!: string;

  // Computed pour filtrer les tâches non terminées
  tasksPending = computed(() =>
    this.tasks().filter((task) => !task.completed)
  );

  // Computed pour filtrer les tâches terminées
  tasksCompleted = computed(() =>
    this.tasks().filter((task) => task.completed)
  );

  constructor( private taskService : TaskService) {}

   ngOnInit(): void {
        this.loadTasks();
   }

   loadTasks(): void {
     this.taskService.getTasks().subscribe((tasks) => {
      // Mettre à jour le signal avec les tâches chargées
      this.tasks.set(tasks);
     });
   }

    addTask(): void {
        if (!this.newTask.title.trim()) {
          alert('Le titre de la tâche ne peut pas être vide.');
          return;
        }

        this.taskService.createTask(this.newTask).subscribe((task) => {
          this.tasks.update((currentTasks) => [...currentTasks, task]);
          this.newTask = { title: '', completed: false }; // Réinitialiser la tâche
        });
      }

    updateTask(task: Task): void {
      this.taskService.updateTask(task).subscribe((updatedTask) => {
        this.tasks.update((tasks) =>
         tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
          );
        });
      }

    deleteTask(id: number): void {
      this.taskService.deleteTask(id).subscribe(() => {
        this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
       });
     }
/* *************  ancienne version methodes CRUD sans les signaux signal() et computed() **************** */

  /* loadTasks(): void {
     this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
   }

   addTask(): void {
     this.taskService.createTask(this.newTask).subscribe(task => {
       this.tasks.push(task);
       this.newTask = { title: '', completed: false };
     });
   }

   updateTask(task: Task): void {
     this.taskService.updateTask(task).subscribe();
  /*this.markTaskAsCompleted(task);
        // this.completedTasksCount();
          console.log(this.completedTasksCount().length);
   }

   deleteTask(id: number): void {
     this.taskService.deleteTask(id).subscribe(() => {
       //filter() retourne un nouveau tableau sans les tasks dont l id ne corrspond pas l id du task supprimer
        this.tasks=this.tasks.filter(task => task.id !== id);
     });
   }*/

 /*markTaskAsCompleted (task: Task): void {
   // Mettre à jour la valeur du signal
   task.completed = true;
   this.isTaskCompleted.set(true);
 }

  // Création d'un signal calculé pour le nombre de tâches terminées
   completedTasksCount = computed(() => {
     // Logique de calcul du nombre de tâches terminées

    return this.tasks=this.tasks.filter((task) => task.completed);
   });*/
}

