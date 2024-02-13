import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CanceledDirective } from '../../../directives/canceled/canceled.directive';

@Component({
  selector: 'app-update-dialog',
  standalone: true,
  imports: [MatDialogModule,CanceledDirective, MatFormFieldModule, MatInputModule, MatSelectModule, MatLabel, MatFormField, FormsModule],
  templateUrl: './update-dialog.component.html',
  styleUrl: './update-dialog.component.css'
})

export class UpdateDialogComponent {
  selectedOption!: string;

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(this.selectedOption);
  }
  isInvalidQuantity(): boolean {
    return (
      this.selectedOption === null ||
      this.selectedOption === undefined
    );
  };
}
