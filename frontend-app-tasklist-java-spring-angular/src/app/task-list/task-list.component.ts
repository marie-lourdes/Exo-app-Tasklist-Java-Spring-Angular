import { Component,OnInit, signal, computed,inject,linkedSignal } from '@angular/core';
import { TaskService, Task } from '../service/task.service';
import {CommonModule} from '@angular/common';
// pour ngModel!!! le formModule doit etre importe dans le component qui l utilise et pas dans le app.module  selon l exo
import {FormsModule } from '@angular/forms'; // Importer FormsModule
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule,FormsModule,MatIconModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit{
  iconDeleteStyles = '#3498db';
  //on utilise ici la fonction inject() au lieu d injecter le service dans le constructor rendant ainsi l'héritage plus maniable dans Angular.
  //cela est possible grace à la configuration dans le provider de app.config.ts
  taskService = inject(TaskService);

/* ************* Refactoring method CRUD with reactive programming with signal() computed() ********************** */

  // Signal contenant toutes les tâches (directement obtenu depuis le service)
  tasks = this.taskService.getTasks();


  //on cree des donne vide et par defaut pour le template a remplir de l ajout d un task
  newTask : Task = {title:'', completed:false, date:''};

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

   ngOnInit(): void {
     // Les tâches sont déjà chargées initialement via le service
     //this.loadTasks();
   }

  /* loadTasks(): void {
     this.taskService.getTasks().subscribe((tasks) => {
      // Mettre à jour le signal avec les tâches chargées
      this.tasks.set(tasks);
     });
   }*/

// Ajouter une tâche
    addTask(): void {
        if (!this.newTask.title.trim()) {
          alert('Le titre de la tâche ne peut pas être vide.');
          return;
        }
        this.taskService.createTask(this.newTask);
        this.newTask = { title: '', completed: false, date:'' }; // Réinitialiser la tâche

      }
// Mettre à jour une tâche

    updateTask(task: Task): void {
      this.taskService.updateTask(task);
      confirm( "number of tasks completed computed:" + this.tasksCompleted().length);
      }

    deleteTask(id: number): void {
      this.taskService.deleteTask(id);
      }
}

