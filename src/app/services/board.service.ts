import {Injectable} from '@angular/core';
import {collection, deleteDoc, Firestore, onSnapshot, setDoc} from "@angular/fire/firestore";
import {FirestoreUtils} from "../Utils/FirestoreUtils";
import {Board} from "../model/board";
import {BehaviorSubject, Observable} from "rxjs";
import {SubscriptionData} from "../model/subscription-data";
import firebase from "firebase/compat";
import Unsubscribe = firebase.Unsubscribe;
import {ProspectiveClient} from "../model/prospective-client";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  boardsCollectionName = 'boards';

  constructor(private store: Firestore, private utils: FirestoreUtils) {
  }

  createBoard(boardData: Board) {
    let docRef = this.utils.getDocRef(this.boardsCollectionName);
    setDoc(docRef.docReference, {
      ...boardData,
      id: docRef.docRefId
    }).then(() => console.log(`Item successfully added: ${boardData}`));
  }

  deleteItem(collectionName: string, itemId: string) {
    deleteDoc(this.utils.getDocRef(collectionName, itemId).docReference).then(() => console.log(`Item successfully deleted`));
  }

  getBoards(): SubscriptionData {
    let unsubscribe: Unsubscribe;
    const subject = new BehaviorSubject<Board[]>([]);
    unsubscribe = onSnapshot(collection(this.store, this.boardsCollectionName), snapshot => {
      let boards: Board[] = [];
      snapshot.forEach(doc => {
        boards.push(<Board>doc.data());
      });
      subject.next(boards);
    });
    return {
      data: subject as Observable<Board[]>,
      unsubscribe: unsubscribe
    }
  }

  updateTasks(id: string | undefined, tasks: ProspectiveClient[] | undefined) {

  }
}
