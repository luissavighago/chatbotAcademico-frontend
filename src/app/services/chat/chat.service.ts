import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UUID } from 'crypto';

declare const URL_BASE_API: string;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  httpClient = inject(HttpClient)
  urlBaseApi = URL_BASE_API;
  
  constructor() { }

  sendMessage(payload: any) {
    return this.httpClient.post<any>(this.urlBaseApi+"/chatbot/ask", payload);
  }

  sendMessagePrompts(payload: any) {
    return this.httpClient.post<any>(this.urlBaseApi+"/prompts/ask", payload);
  }

  evaluateResponse(id:UUID, payload: {}) {
    return this.httpClient.put<any>(this.urlBaseApi+"/chatbot/evaluate-answer/"+id, payload);
  }
}