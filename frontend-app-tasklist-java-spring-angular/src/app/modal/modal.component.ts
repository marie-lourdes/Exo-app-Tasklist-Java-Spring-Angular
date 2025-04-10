import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Component,Inject,WritableSignal } from '@angular/core';
import {CommonModule} from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskService} from '../service/task.service';
import {  Task } from '../model/task';

@Component({
  selector: 'app-modal',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  public task: Task;
  public date: string;
  public tasks: WritableSignal<Task[]>
;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
     @Inject(MAT_DIALOG_DATA) public data:{date: string; tasks: WritableSignal<Task[]>},
     private taskService: TaskService){
         this.task= {title:'', completed:false, description:'', date: data.date};
         this.date = data.date;
         this.tasks = data.tasks; // Tâches passées par AgendaComponent, Signal des tâches injectées
          console.log('Tâches reçues dans le modal :', this.tasks());

       }

     onSubmit(): void {
        this.taskService.createTask(this.task);
        this.dialogRef.close();
     }

    onClose(): void {
      this.dialogRef.close();
    }

}
