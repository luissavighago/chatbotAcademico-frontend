import { Component, Input } from '@angular/core';
import { UUID } from 'crypto';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent {
  @Input() type: 'pergunta' | 'resposta' = 'pergunta';
  @Input() id!: UUID;
  @Input() text!: string;
}
