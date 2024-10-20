import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  httpClient = inject(HttpClient)
  
  constructor() { }

  sendMessage(payload: any) {
    return this.httpClient.post<any>("http://localhost:8080/chatbot/ask", payload);
  }
}
