import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-modal',
  imports: [MAT_DIALOG_DATA, MatDialogRef,MatDialogModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  /* MatDialogRef
        - C'est une instance spécifique pour interagir avec un dialogue particulier.
        - Fournit des fonctionnalités comme `close()` et `afterClosed()`.
     `MAT_DIALOG_DATA`
        -est un jeton d'injection pour **passer des données entre le parent et le composant de dialogue**.
        - Vous passez les données depuis le parent (AgendaComponent) en utilisant l'option `data` dans `MatDialog`.
       - Vous accédez aux données dans le composant de dialogue via l'injection de `MAT_DIALOG_DATA`.

         C'est ce qui permet d'établir une communication rapide et directe entre votre composant appelant et votre composant de dialogue modal.

        */

  constructor(
    public dialogRef: MatDialogRef <ModalComponent>,
     @Inject(MAT_DIALOG_DATA) public data:{date:string}
    }

    onClose(): void {
      this.dialogRef.close();
    }


}
