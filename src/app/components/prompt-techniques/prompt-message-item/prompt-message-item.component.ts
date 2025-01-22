import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '../../../interfaces/message.interface';
import { UUID } from 'crypto';
import { FeedbackStatus } from '../../../enum/feedbackstatus.enum';
import { MessageType } from '../../../enum/messagetype.enum';
import { PromptTechnique } from '../../../enum/prompttechnique.enum';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-prompt-message-item',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './prompt-message-item.component.html',
  styleUrl: './prompt-message-item.component.css'
})
export class PromptMessageItemComponent {
  @Input() message!: Message;
  @Output() evaluateResponse = new EventEmitter<{id: UUID, feedbackStatus: FeedbackStatus}>();

  MessageType = MessageType;
  FeedbackStatus = FeedbackStatus;
  PromptTechnique = PromptTechnique;

  onClickFeedback(feedbackStatus: FeedbackStatus) {
    if(this.message.feedbackStatus === feedbackStatus) {
      feedbackStatus = FeedbackStatus.Unrated;
    }
    const messageId = this.message.id;
    if (!messageId) {return;}

    this.evaluateResponse.emit({ id: messageId, feedbackStatus: feedbackStatus })
  }
}
