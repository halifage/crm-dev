import {HistoryNote} from "./history-note";

export interface ProspectiveClient {
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
  history?: HistoryNote[];
  statusColor?: 'lightsalmon' | 'lightgreen' | 'lightcoral';
}
