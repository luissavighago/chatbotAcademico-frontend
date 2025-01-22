import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UUID } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  httpClient = inject(HttpClient)
  
  constructor() { }

  sendMessage(payload: any) {
    return this.httpClient.post<any>("http://localhost:8080/chatbot/ask", payload);
  }

  sendMessagePrompts(payload: any) {
    return this.httpClient.post<any>("http://localhost:8080/prompts/ask", payload);
  }

  evaluateResponse(id:UUID, payload: {}) {
    return this.httpClient.put<any>("http://localhost:8080/chatbot/evaluate-answer/"+id, payload);
  }
}
