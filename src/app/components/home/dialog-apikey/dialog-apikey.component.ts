import { Component, inject, Input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Chat } from '../../../interfaces/chat.interface';

@Component({
  selector: 'dialog-apikey',
  templateUrl: 'dialog-apikey.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  styleUrl: 'dialog-apikey.component.css',
})
export class DialogApiKeyComponent {
  readonly dialogRef = inject(MatDialogRef<DialogApiKeyComponent>);
  readonly data = inject<Chat>(MAT_DIALOG_DATA);
  readonly key = model(this.data.apiKey);

  onNoClick(): void {
    this.dialogRef.close();
  }
}