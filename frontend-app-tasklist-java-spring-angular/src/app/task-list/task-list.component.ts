import { Component,OnInit } from '@angular/core';
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
  tasks : Task[]= [];

  //on cree des donne vide et par defaut pour le template a remplir de l ajout d un task
  newTask : Task = {title:'', completed:false};
  color!: string;

  constructor( private taskService : TaskService) {}

   ngOnInit(): void {
     this.loadTasks();
   }

   loadTasks(): void {
     this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
   }

   addTask(): void {
     this.taskService.createTask(this.newTask).subscribe(task => {
       this.tasks.push(task);
       this.newTask = { title: '', completed: false };
     });
   }

   updateTask(task: Task): void {
     this.taskService.updateTask(task).subscribe()
   }

   deleteTask(id: number): void {
     this.taskService.deleteTask(id).subscribe(() => {
       //filter() retourne un nouveau tableau sans les tasks dont l id ne corrspond pas l id du task supprimer
       this.tasks = this.tasks.filter(task => task.id !== id);
     });
   }

}

