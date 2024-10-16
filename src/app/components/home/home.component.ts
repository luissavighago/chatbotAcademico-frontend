import { Component} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { MessageListComponent } from '../message-list/message-list.component';
import { Chat } from '../../class/chat.class';
import { Message } from '../../class/message.interface';

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
    this.chat = {messages:[]};
  }

  onMessageSubmitted(message: Message) {
    console.log("Mensagem enviada: "+message)
    this.chat.messages?.push(message);
  }
}
