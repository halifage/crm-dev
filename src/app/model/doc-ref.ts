import {DocumentData, DocumentReference} from "rxfire/firestore/interfaces";

export interface DocRef {
  docReference: DocumentReference<DocumentData>;
  docRefId: string;
}
