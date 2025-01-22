import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FeedbackStatus } from '../../../enum/feedbackstatus.enum';
import { UUID } from 'crypto';
import { Message } from '../../../interfaces/message.interface';
import { PromptMessageItemComponent } from '../prompt-message-item/prompt-message-item.component';

@Component({
  selector: 'app-prompt-message-list',
  standalone: true,
  imports: [PromptMessageItemComponent],
  templateUrl: './prompt-message-list.component.html',
  styleUrl: './prompt-message-list.component.css'
})
export class PromptMessageListComponent {
  @Input() messages: Message[] = [];
  @Output() evaluateResponse = new EventEmitter<{id: UUID, feedbackStatus:FeedbackStatus}>();

  onEvaluateResponse(params: { id: UUID, feedbackStatus: FeedbackStatus }) {
    this.evaluateResponse.emit(params)
  }
}