import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageItemComponent } from '../message-item/message-item.component';
import { Message } from '../../../interfaces/message.interface';
import { UUID } from 'crypto';
import { FeedbackStatus } from '../../../enum/feedbackstatus.enum';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [MessageItemComponent],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  @Input() messages: Message[] = [];
  @Output() evaluateResponse = new EventEmitter<{id: UUID, feedbackStatus:FeedbackStatus}>();

  onEvaluateResponse(params: { id: UUID, feedbackStatus: FeedbackStatus }) {
    this.evaluateResponse.emit(params)
  }
}
