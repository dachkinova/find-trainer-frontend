import {Component, EventEmitter, Inject, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'confirmation-dialog.component',
  templateUrl: './successful-dialog.component.html',
  styleUrls: ['./successful-dialog.component.scss']
})
export class SuccessfulDialogComponent {
  @Output() okClick: EventEmitter<void> = new EventEmitter<void>();
  message: string;

  constructor(
      public dialogRef: MatDialogRef<SuccessfulDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {
    this.message = data.message;
  }

  onOKClick(): void {
    this.okClick.emit();
    this.dialogRef.close();
  }
}
