import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input() isDisabled: boolean = false;
  @Output() messageSubmitted = new EventEmitter<Message>();

  onSubmit() {
    if (!this.questionIsValid()) {
      return;
    }

    this.message = {
      text: this.question,
      type: MessageType.Question
    };

    this.question = ""
    this.messageSubmitted.emit(this.message)
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      alert("Enter key pressed");
      this.onSubmit();
    }
  }

  questionIsValid(): boolean {
    if (this.question.trim().length === 0) {
      return false;
    }
    return true;
  }
}
