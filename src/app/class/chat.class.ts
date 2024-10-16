import { UUID } from "crypto";
import { Message } from "./message.class";

export class Chat {
  id?: UUID;
  messages?: Message[]

  constructor(id: UUID, messages: Message[]) {
    this.id = id;
    this.messages = messages;
  }
}