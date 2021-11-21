import {Injectable} from '@angular/core';
import {deleteDoc, Firestore, setDoc} from "@angular/fire/firestore";
import {FirestoreUtils} from "../util/FirestoreUtils";
import {ProspectiveClient} from "../model/prospective-client";

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private store: Firestore, private utils: FirestoreUtils) { }

  updateItem(collectionName: string, item: ProspectiveClient, itemId?: string) {
    let docRef = this.utils.getDocRef(collectionName, itemId);
    setDoc(docRef.docReference, item).then(() => console.log(`Item successfully added: ${item}`));
  }

  deleteItem(collectionName: string, itemId: string) {
    deleteDoc(this.utils.getDocRef(collectionName, itemId).docReference).then(() => console.log(`Item successfully deleted`));
  }

}
