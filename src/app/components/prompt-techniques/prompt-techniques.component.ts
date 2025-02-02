import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../home/header/header.component';
import { Chat } from '../../interfaces/chat.interface';
import { MessageInputComponent } from '../home/message-input/message-input.component';
import { Message } from '../../interfaces/message.interface';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { MessageType } from '../../enum/messagetype.enum';
import { PromptMessageListComponent } from "./prompt-message-list/prompt-message-list.component";
import { UUID } from 'crypto';
import { FeedbackStatus } from '../../enum/feedbackstatus.enum';
import { PromptTechnique } from '../../enum/prompttechnique.enum';
import { PromptMessageItemComponent } from './prompt-message-item/prompt-message-item.component';
import { ChatService } from '../../services/chat/chat.service';
import { MsgDialogService } from '../../services/msg/msg-dialog.service';
import { MsgDialogType } from '../../enum/msgdialogtype.enum';

@Component({
  selector: 'app-prompt-techniques',
  standalone: true,
  imports: [HeaderComponent, MessageInputComponent, ProgressBarComponent, PromptMessageListComponent, PromptMessageItemComponent],
  templateUrl: './prompt-techniques.component.html',
  styleUrl: './prompt-techniques.component.css'
})
export class PromptTechniquesComponent {
  chatService = inject(ChatService);
  msgDialogService = inject(MsgDialogService);

  userMessage: Message | undefined;
  chat: Chat;
  isLoading: boolean = false;

  constructor() {
    this.chat = { messages: [], apiKey: "" };
  }

  onMessageSubmitted(message: Message) {
    this.userMessage = message;
    this.clearAnswerList();
    this.isLoading = true;
    this.chatService.sendMessagePrompts(this.getPayload(message)).subscribe(
      (response) => {
        this.setResponseData(response);
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

    console.log(params)

    const messageIndex = this.chat.messages?.findIndex(msg => msg.id === params.id);
    if (messageIndex === undefined || messageIndex < 0) {
      return;
    }

    console.log(messageIndex);
  
    this.chat.messages[messageIndex].feedbackStatus = params.feedbackStatus;

    this.chatService.evaluateResponse(params.id, {"feedbackStatus":params.feedbackStatus}).subscribe(
      (response) => {
        console.log("Feedback enviado com sucesso");
      },
      (error) => {
        console.log("Falha ao enviar feedback");
        console.log(error);
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

  setResponseData(response: any) {
    if (!this.responseIsValid(response)) {
      return;
    }

    this.chat.id = response.data.idChat;

    response.data.answers.forEach((answer: { idAnswer: UUID, answer: string, promptTechnique: string }) => {
      const message: Message = {
        id: answer.idAnswer,
        text: answer.answer,
        type: MessageType.Answer,
        feedbackStatus: FeedbackStatus.Unrated,
        promptTechnique: answer.promptTechnique as PromptTechnique
      };

      this.chat.messages?.push(message);
    });
  }

  responseIsValid(response: any) {
    if (response?.error && response?.error.status && response?.error.err) {
      console.error(`Error: ${response.error.status} - ${response.error.err}`);
      return false;
    }
    if (!response.success || !response?.data) {
      return false;
    }

    if (!response.data.idChat || !response.data.idQuestion) {
      console.error('Response is missing required properties.');
      return false;
    }

    if (!Array.isArray(response.data.answers) || response.data.answers.length === 0) {
      console.error('Answer is not a valid array of strings.');
      return false;
    }

    console.log('Response is valid.');

    return true;
  }

  clearAnswerList() {
    if (this.chat.messages) {
      this.chat.messages = [];
    }
    if (this.chat.id) {
      this.chat.id = undefined;
    }
  }
}
