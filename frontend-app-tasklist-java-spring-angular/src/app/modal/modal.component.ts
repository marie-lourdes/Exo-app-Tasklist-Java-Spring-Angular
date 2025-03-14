import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskService, Task } from '../service/task.service';

@Component({
  selector: 'app-modal',
  imports: [
    FormsModule,
    MatDialogModule,
    //BrowserAnimationsModule, // Nécessaire pour utiliser Angular Material mais semble provoquer des bug et le modal ne s affiche pas
    MatFormFieldModule,
    MatInputModule,
    ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  public task: Task;
  public date: string;
  public tasks: Task[];


  /* MatDialogRef:
        - C'est une instance spécifique pour interagir avec un dialogue particulier.
        - Fournit des fonctionnalités comme `close()` et `afterClosed()`.
     `MAT_DIALOG_DATA`
        -est un jeton d'injection pour **passer des données entre le parent et le composant de dialogue**.
        - Vous passez les données depuis le parent (AgendaComponent) en utilisant l'option `data` dans `MatDialog`.
       - Vous accédez aux données dans le composant de dialogue via l'injection de `MAT_DIALOG_DATA`.

         C'est ce qui permet d'établir une communication rapide et directe entre votre composant appelant et votre composant de dialogue modal.

        */

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
     @Inject(MAT_DIALOG_DATA) public data:{date: string; tasks: Task[]},
     private taskService: TaskService){
         this.task= {title:'', completed:false, description:'', date: data.date};
         this.date = data.date;
         this.tasks = data.tasks; // Tâches passées par AgendaComponent
       }

     onSubmit(): void {
        this.taskService.createTask(this.task);
        this.dialogRef.close(); //Fermer le modal
     }

    onClose(): void {
      this.dialogRef.close();
    }

}
