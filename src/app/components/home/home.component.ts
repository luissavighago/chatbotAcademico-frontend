import { Component} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { MessageListComponent } from '../message-list/message-list.component';
import { Chat } from '../../class/chat.class';
import { Message } from '../../class/message.class';
import { MessageType } from '../../enum/messagetype.enum';

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
    this.chat = new Chat(
      "2bdd0475-fc9d-4f3c-8087-7ddd97592287",
      [
        new Message("2bdd0475-fc9d-4f3c-8087-7ddd97592287","Olá, como vai?",MessageType.Question),
        new Message("2bdd0475-fc9d-4f3c-8087-7ddd97592287","Vou bem e vc?",MessageType.Answer),
        new Message("2bdd0475-fc9d-4f3c-8087-7ddd97592287","Olá, como vai?",MessageType.Question),
        new Message("2bdd0475-fc9d-4f3c-8087-7ddd97592287","Vou bem e vc?",MessageType.Answer)
      ]
    )
  }
}
