import { Component, Input } from '@angular/core';
import { MessageItemComponent } from '../message-item/message-item.component';
import { Message } from '../../class/message.class';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [MessageItemComponent],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  @Input() messages: Message[] = [];
}
