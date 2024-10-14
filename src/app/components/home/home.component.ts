import { Component} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { MessageItemComponent } from '../message-item/message-item.component';
import { UUID } from 'crypto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MessageInputComponent, MessageItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  //id!: UUID
  id: UUID = "35049083-b10b-4d28-924f-ed8490a04e90";
}
