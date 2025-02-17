import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef <ModalComponent>,
     @Inject(MAT_DIALOG_DATA) public data:{date:string}
    }

    onClose(): void {
      this.dialogRef.close();
    }


}
