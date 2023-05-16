import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'confirmation-dialog-trainer.component',
  templateUrl: './confirmation-dialog-trainer.component.html',
  styleUrls: ['./confirmation-dialog-trainer.component.scss']
})
export class ConfirmationDialogTrainerComponent {
  title: string;
  message: string;

  constructor(
      public dialogRef: MatDialogRef<ConfirmationDialogTrainerComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
