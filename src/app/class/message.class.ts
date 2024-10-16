import { UUID } from "crypto";
import { MessageType } from "../enum/messagetype.enum";

export class Message {
  id?: UUID;
  text!: string;
  type!: MessageType;

  constructor(id: UUID, text: string, type: MessageType) {
    this.id = id;
    this.text = text;
    this.type = type;
  }
}