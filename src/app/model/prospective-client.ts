import {NotesHistory} from "./notes-history";

export interface ProspectiveClient {
  id?: string;
  userId?:string;
  companyName: string;
  companyAddress: string;
  companyIndustry: string;
  companyType?: string;
  contactPersonAtCompany?: string;
  contactPersonRole?: string;
  contactPersonEmail?: string;
  contactPersonPhone?: number;
  decisionMakerAtCompany?: string;
  decisionMakerEmail?: string;
  decisionMakerPhone?: number;
  assignedAgentName?: string;
  assignedAgentNotes?: string;
  nextMeetingDate?: Date;
  createdDate?: Date;
  history?: NotesHistory[];
  lastUpdatedDate?: Date;
  currentColumn?: string;
  statusColor?: 'lightsalmon' | 'lightgreen' | 'lightcoral';
}
