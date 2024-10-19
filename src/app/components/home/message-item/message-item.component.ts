import { Component, input, computed } from '@angular/core';
import { Message } from '../../../interfaces/message.interface';
import { MessageType } from '../../../enum/messagetype.enum';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent {
  message = input.required<Message>();
  MessageType = MessageType;

  messageText = computed(() => this.message().text);
  messageType = computed(() => this.message().type);
}
