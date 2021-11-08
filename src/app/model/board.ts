import {ProspectiveClient} from "./prospective-client";

export interface Board {
  id?: string;
  title: string;
  tasks: ProspectiveClient[] | undefined; // todo remove
}
