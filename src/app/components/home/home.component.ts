import { Component, inject } from '@angular/core';
import { Chat } from '../../interfaces/chat.interface';
import { Message } from '../../interfaces/message.interface';
import { ChatService } from '../../services/chat.service';
import { HeaderComponent } from './header/header.component';
import { MessageType } from '../../enum/messagetype.enum';
import { MessageInputComponent } from './message-input/message-input.component';
import { MessageListComponent } from './message-list/message-list.component';

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
    this.chat.messages?.push(message);
    console.log("Enviando mensagem: ", message);
    this.chatService.sendMessage(this.getPayload(message)).subscribe(
      (response) => {
        console.log("Resposta recebida: ", response);
        this.tratarResposta(response);
      },
      (error) => {
        console.error("Erro ao enviar mensagem: ", error);
        // TODO - Apresentar dialog com mensagem de erro
      }
    );
  }

  getPayload(message: Message): any {
    const payload: any = {};
    if (this.chat.id != null) {
      payload.idChat = this.chat.id;
    }
    payload.question = message.text;
    console.log("Payload: ", payload);
    return payload;
  }

  tratarResposta(response: any) {
    if(!this.responseIsValid(response)) {
      return;
    }

    this.chat.id = response.data.idChat;

    const message: Message = {
      id: response.data.idAnswer,
      text: response.data.answer,
      type: MessageType.Answer
    };

    this.chat.messages?.push(message);
  }

  responseIsValid(response: any) {
    if (response?.error && response?.error.status && response?.error.err) {
      console.error(`Error: ${response.error.status} - ${response.error.err}`);
      return false;
    } 
    if (!response.success || !response?.data) {
      console.log("Response data not found.");
      return ;
    }
  
    if (!response.data.idChat || !response.data.idQuestion || !response.data.idAnswer || !response.data.answer) {
      console.error('Response is missing required properties.');
      return false;
    }
  
    if (response.data.answer == null || response.data.answer.trim() === '') {
      console.error('Answer is not a valid string.');
      return false;
    }
  
    console.log("Response is valid.");
  
    return true;
  }
}