import {NotesHistory} from "./notes-history";

export interface ProspectiveClient {
  id?: string;
  companyName: string;
  companyAddress: string;
  companyIndustry: string;
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
  history?: NotesHistory[];
  statusColor?: 'lightsalmon' | 'lightgreen' | 'lightcoral';
}
