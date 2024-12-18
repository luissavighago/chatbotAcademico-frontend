import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Chat } from '../../../interfaces/chat.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogApiKeyComponent } from '../dialog-apikey/dialog-apikey.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() chat : Chat = {messages:[], apiKey:"teste"};
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogApiKeyComponent, {data: this.chat});

    dialogRef.afterClosed().subscribe(result => {
      (result !== undefined) ? this.chat.apiKey = result : "";
    });
  }
}
