import { Component} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { MessageListComponent } from '../message-list/message-list.component';
import { Chat } from '../../interfaces/chat.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    MessageInputComponent,
    MessageListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  chat: Chat;

  constructor() {
    this.chat = {};
  }
}
