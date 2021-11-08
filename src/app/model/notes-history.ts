import {Timestamp} from "@angular/fire/firestore";

export interface NotesHistory {
  userId?: string;
  agentName?: string;
  date?: Date | Timestamp;
  text?: string;
}
