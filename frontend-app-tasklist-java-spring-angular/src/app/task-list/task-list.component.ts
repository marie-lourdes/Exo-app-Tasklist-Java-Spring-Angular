import { Component,OnInit, signal, computed,inject,linkedSignal } from '@angular/core';
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

  //on utilise ici la fonction inject() au lieu d injecter le service dans le constructor rendant ainsi l'héritage plus maniable dans Angular.
  //cela est possible grace à la configuration dans le provider de app.config.ts
  taskService = inject(TaskService);

/* ************* Refactoring method CRUD with reactive programming with signal() computed() ********************** */

   // Signal contenant toutes les tâches
    tasks = signal<Task[]>([]);

  //on cree des donne vide et par defaut pour le template a remplir de l ajout d un task
  newTask : Task = {title:'', completed:false};

  // Computed pour filtrer les tâches non terminées
  tasksPending = computed(() =>
    this.tasks().filter((task) => !task.completed)
  );

  // Computed pour filtrer les tâches terminées
  tasksCompleted = computed(() =>
    this.tasks().filter((task) => task.completed)
  );

// Test de LinkedSignal qui rend modifiable un Signal et reagit au Signal source: this.tasks
  numberTask = linkedSignal({
    source: this.tasks,
    computation: () => this.tasks().length // Valeur par défaut et initial
  });

 // constructor( private taskService : TaskService) {}

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
         confirm( "number of tasks completed computed:" + this.tasksCompleted().filter(task => task.completed ).length);
        });
      }

     deleteTask(id: number): void {
          this.taskService.deleteTask(id).subscribe(() => {
            this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
           });
         }

}

