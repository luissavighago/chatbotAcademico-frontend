import { Component, input, computed, inject } from '@angular/core';
import { Message } from '../../../interfaces/message.interface';
import { MessageType } from '../../../enum/messagetype.enum';
import { FeedbackStatus } from '../../../enum/feedbackstatus.enum';
import { MatIconModule } from '@angular/material/icon';
import { ChatService } from '../../../services/chat/chat.service';
@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent {
  message = input.required<Message>();
  MessageType = MessageType;
  FeedbackStatus = FeedbackStatus;
  chatService = inject(ChatService);

  messageText = computed(() => this.message().text);
  messageType = computed(() => this.message().type);
  messageFeedbackStatus = computed(() => this.message().feedbackStatus);

  onClickFeedback(feedbackStatus: FeedbackStatus) {
    if(this.message().feedbackStatus === feedbackStatus) {
      return;
    }
    const messageId = this.message().id;
    if (!messageId) {
      return;
    }

    this.message().feedbackStatus = feedbackStatus;

    this.chatService.evaluateResponse(messageId, {"feedbackStatus":feedbackStatus}).subscribe(
      (response) => {
        console.log("Feedback enviado com sucesso");
      },
      (error) => {
        console.log("Falha ao enviar feedback");
        this.message().feedbackStatus = FeedbackStatus.Unrated;
      }
    );
  }

  getPayload(message: Message): any {
    const payload: any = {};
    payload.question = message.text;
    return payload;
  }
}
