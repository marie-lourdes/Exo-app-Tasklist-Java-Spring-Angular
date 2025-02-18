import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogModule} from '@angular/material/dialog';
import { TaskService, Task } from '../service/task.service';

@Component({
  selector: 'app-modal',
  imports: [MatDialogModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  private task: Task;

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
     @Inject(MAT_DIALOG_DATA) public data:{date:string},
     private taskService: TaskService){
         this.task= {title:'', completed:false, description:'', date: data.date};
       }
     onSubmit(): void {
        this.taskService.addTask(this.task).subscribe({
          //objet next, error, complete passé en parametre de subscribe au lieu de la fonction callback qui recupere par defaut l objet next (la valeur emise par l observable)
          next: result => {
            console.log('Tâche ajoutée', result);
            this.dialogRef.close(result); // Fermer le modal avec le résultat
          },
          error: err => console.error('Erreur lors de l\'ajout de la tâche', err)
          //complete: ()=>{}
        });

    onClose(): void {
      this.dialogRef.close();
    }


}
