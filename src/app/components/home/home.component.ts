import { Component, inject } from '@angular/core';
import { Chat } from '../../interfaces/chat.interface';
import { Message } from '../../interfaces/message.interface';
import { ChatService } from '../../services/chat/chat.service';
import { HeaderComponent } from './header/header.component';
import { MessageType } from '../../enum/messagetype.enum';
import { MessageInputComponent } from './message-input/message-input.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MsgDialogService } from '../../services/msg/msg-dialog.service';
import { MsgDialogType } from '../../enum/msgdialogtype.enum';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MessageInputComponent, MessageListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  chatService = inject(ChatService);
  msgDialogService = inject(MsgDialogService);
  chat: Chat;

  constructor() {
    this.chat = { messages: [] };
  }

  onMessageSubmitted(message: Message) {
    this.chat.messages?.push(message);
    this.chatService.sendMessage(this.getPayload(message)).subscribe(
      (response) => {
        this.tratarResposta(response);
      },
      (error) => {
        this.msgDialogService.openDialog({
          title: 'Ops, algo deu errado!',
          message: 'Falha ao enviar mensagem, tente novamente.',
          type: MsgDialogType.Ok,
        });
      }
    );
  }

  getPayload(message: Message): any {
    const payload: any = {};
    if (this.chat.id != null) {
      payload.idChat = this.chat.id;
    }
    payload.question = message.text;
    return payload;
  }

  tratarResposta(response: any) {
    if (!this.responseIsValid(response)) {
      return;
    }

    this.chat.id = response.data.idChat;

    const message: Message = {
      id: response.data.idAnswer,
      text: response.data.answer,
      type: MessageType.Answer,
    };

    this.chat.messages?.push(message);
  }

  responseIsValid(response: any) {
    if (response?.error && response?.error.status && response?.error.err) {
      console.error(`Error: ${response.error.status} - ${response.error.err}`);
      return false;
    }
    if (!response.success || !response?.data) {
      return false;
    }

    if (
      !response.data.idChat || !response.data.idQuestion ||
      !response.data.idAnswer || !response.data.answer
    ) {
      console.error('Response is missing required properties.');
      return false;
    }

    if (response.data.answer == null || response.data.answer.trim() === '') {
      console.error('Answer is not a valid string.');
      return false;
    }

    console.log('Response is valid.');

    return true;
  }
}