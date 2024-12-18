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
import { ProgressBarComponent } from "../progress-bar/progress-bar.component";
import { FeedbackStatus } from '../../enum/feedbackstatus.enum';
import { UUID } from 'crypto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MessageInputComponent, MessageListComponent, ProgressBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  chatService = inject(ChatService);
  msgDialogService = inject(MsgDialogService);

  isLoading: boolean = false;
  chat: Chat;

  constructor() {
    this.chat = { messages: [], apiKey: "" };
  }

  onMessageSubmitted(message: Message) {
    this.chat.messages?.push(message);
    this.isLoading = true;
    this.chatService.sendMessage(this.getPayload(message)).subscribe(
      (response) => {
        this.tratarResposta(response);
        this.isLoading = false;
      },
      (error) => {
        this.msgDialogService.openDialog({
          title: 'Ops, algo deu errado!',
          message: 'Falha ao enviar mensagem, tente novamente.',
          type: MsgDialogType.Ok,
        });
        this.isLoading = false;
      }
    );
  }

  onEvaluateResponse(params: { id: UUID, feedbackStatus: FeedbackStatus }) {
    
    if (!this.chat.messages) {
      return;
    }

    const messageIndex = this.chat.messages?.findIndex(msg => msg.id === params.id);
    if (messageIndex === undefined || messageIndex < 0) {
      return;
    }
  
    this.chat.messages[messageIndex].feedbackStatus = params.feedbackStatus;

    this.chatService.evaluateResponse(params.id, {"feedbackStatus":params.feedbackStatus}).subscribe(
      (response) => {},
      (error) => {
        console.log("Falha ao enviar feedback");
        this.chat.messages![messageIndex].feedbackStatus = FeedbackStatus.Unrated;
      }
    );
  }

  getPayload(message: Message): any {
    const payload: any = {};
    if (this.chat.id != null) {
      payload.idChat = this.chat.id;
    }
    if(this.chat.apiKey != null && this.chat.apiKey.trim() !== ""){
      payload.apiKey = this.chat.apiKey;
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
      feedbackStatus: FeedbackStatus.Unrated
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