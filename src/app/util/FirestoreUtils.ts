import {DocumentData, DocumentReference} from "rxfire/firestore/interfaces";
import {collection, doc, Firestore, onSnapshot, Timestamp} from "@angular/fire/firestore";
import {DocRef} from "../model/doc-ref";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class FirestoreUtils {
  constructor(private store: Firestore) {
  }

  public getDocRef(collectionName: string, docId?: string): DocRef {
    const collectionRef = collection(this.store, collectionName);
    let documentRef: DocumentReference<DocumentData>;
    if (docId) {
      documentRef = doc(collectionRef, docId);
    } else {
      documentRef = doc(collectionRef);
    }
    return {
      docReference: documentRef,
      docRefId: documentRef.id
    }
  }

  public static convertFirestoreTimestampToDate(value: Timestamp | Date | undefined): Date | undefined {
    if (value == null) {
      return value
    } else if (value instanceof Timestamp) {
      return value.toDate()
    }
    return value
  }

}
