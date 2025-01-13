import { Component, input, computed, inject, Output, EventEmitter, Input } from '@angular/core';
import { Message } from '../../../interfaces/message.interface';
import { MessageType } from '../../../enum/messagetype.enum';
import { FeedbackStatus } from '../../../enum/feedbackstatus.enum';
import { MatIconModule } from '@angular/material/icon';
import { UUID } from 'node:crypto';
@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent {
  @Input() message!: Message;
  @Output() evaluateResponse = new EventEmitter<{id: UUID, feedbackStatus: FeedbackStatus}>();

  MessageType = MessageType;
  FeedbackStatus = FeedbackStatus;

  onClickFeedback(feedbackStatus: FeedbackStatus) {
    if(this.message.feedbackStatus === feedbackStatus) {
      feedbackStatus = FeedbackStatus.Unrated;
    }
    const messageId = this.message.id;
    if (!messageId) {return;}

    this.evaluateResponse.emit({ id: messageId, feedbackStatus: feedbackStatus })
  }

  getPayload(message: Message): any {
    const payload: any = {};
    payload.question = message.text;
    return payload;
  }
}
