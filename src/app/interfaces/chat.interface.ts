import { UUID } from "crypto";
import { Message } from "./message.interface";

export interface Chat {
  id?: UUID;
  messages?: Message[]
}