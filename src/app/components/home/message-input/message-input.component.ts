import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from '../../../interfaces/message.interface';
import { MessageType } from '../../../enum/messagetype.enum';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css'
})
export class MessageInputComponent {
  question: string = "";
  message?: Message;

  @Output() messageSubmitted = new EventEmitter<Message>();

  onSubmit() {
    this.message = {
      text: this.question,
      type: MessageType.Question
    };
    this.question = ""
    this.messageSubmitted.emit(this.message)
  }
}
