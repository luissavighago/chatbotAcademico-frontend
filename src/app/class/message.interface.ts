import { UUID } from "crypto";
import { MessageType } from "../enum/messagetype.enum";

export interface Message {
  id?: UUID,
  text?: string,
  type?: MessageType
}