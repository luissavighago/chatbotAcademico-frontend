import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { MessageListComponent } from '../message-list/message-list.component';
import { Chat } from '../../interfaces/chat.interface';
import { Message } from '../../interfaces/message.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MessageInputComponent, MessageListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  chatService = inject(ChatService);
  chat: Chat;

  constructor() {
    this.chat = { messages: [] };
  }

  onMessageSubmitted(message: Message) {
    console.log('Mensagem enviada: ' + message);
    this.chat.messages?.push(message);

    const payload: any = {};

    if (this.chat.id != null) {
      payload.chatId = this.chat.id;
    }
    payload.question = message.text;

    console.log("Payload: ", payload);

    this.chatService.sendMessage(payload).subscribe(
      (response) => {
        console.log("Resposta recebida: ", response);
        // Handle the response if needed
      },
      (error) => {
        console.error("Erro ao enviar mensagem: ", error);
        // Handle the error if needed
      }
    );
  }
}
