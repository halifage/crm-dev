import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {Auth, onAuthStateChanged, User} from "@angular/fire/auth";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {Board} from "../model/board";
import {
  collection,
  connectFirestoreEmulator,
  deleteDoc,
  doc,
  Firestore, getFirestore,
  initializeFirestore, onSnapshot,
  setDoc
} from "@angular/fire/firestore";
import {ProspectiveClient} from "../model/prospective-client";
import {firebaseApp$, getApp} from "@angular/fire/app";
import firebase from "firebase/compat";
import Unsubscribe = firebase.Unsubscribe;

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  currentAuthenticatedUser = new BehaviorSubject<User | null>(null);
  currentAuthenticatedUserObservable = this.currentAuthenticatedUser as Observable<User>
  boards = new BehaviorSubject<Board[]>([]);
  boardsObservable = this.boards as Observable<Board[]>
  tasks = new BehaviorSubject<Task[]>([]);
  tasksObservable = this.tasks as Observable<Task[]>
  subscriptions: Unsubscribe[] = [];

  constructor(private firebaseAuth: Auth, private firestoreDb: Firestore) {
    const authUnsubscribe = onAuthStateChanged(this.firebaseAuth, user => {
      if (user) {
        this.currentAuthenticatedUser.next(user)
      } else {
        this.currentAuthenticatedUser.next(null)
      }
      this.subscriptions.push(authUnsubscribe)
    });

    const tasksUnsubscribe = onSnapshot(collection(this.firestoreDb, 'tasks'), snapshot => {
      let tasks: Task[] = []
      snapshot.forEach(doc => {
        tasks.push(<Task>doc.data())
      })
      this.tasks.next(tasks)
    })

    const boardsUnsubscribe = onSnapshot(collection(this.firestoreDb, 'boards'), (snapshot) => {
      let boardsList: Board[] = []
      console.log('App Component: boards snapshot: ', snapshot)
      snapshot.forEach(doc => {
        boardsList.push(<Board>doc.data())
        this.boards.next(boardsList)
      })
    })

    this.subscriptions.push(authUnsubscribe, boardsUnsubscribe, tasksUnsubscribe);
  }

  setCurrentAuthenticatedUser(user: User | null) {
    this.currentAuthenticatedUser.next(user);
  }

  getCurrentAuthenticatedUser(): Observable<User> {
    return this.currentAuthenticatedUserObservable;
  }

  setBoards(boards: Board[]) {
    console.log('Service: setBoards: ', boards)
    this.boards.next(boards)
  }

  getBoards(): Observable<Board[]> {
    return this.boardsObservable
  }

  setTasks(tasks: Task[]) {
    this.tasks.next(tasks)
  }

  getTasks(): Observable<Task[]> {
    return this.tasksObservable
  }

  async createBoard(board: Board): Promise<Board> {
    return await this.updateBoard(board)
  }

  async updateBoard(board: Board): Promise<Board> {
    const docRef = doc(collection(this.firestoreDb, 'boards'))
    await setDoc(docRef, Object.assign({}, {...board, id: docRef.id}), {merge: true})
      .then(() => {
        board.id = docRef.id
      })

    return board
  }

  async deleteBoard(board: Board): Promise<void> {

    const docRef = doc(collection(this.firestoreDb, 'boards'), board.id)
    await deleteDoc(docRef)
  }

  async createTask(task: ProspectiveClient): Promise<ProspectiveClient> {
    return await this.updateTask(task)
  }

  async updateTask(task: ProspectiveClient): Promise<ProspectiveClient> {
    const docRef = doc(collection(this.firestoreDb, 'tasks'))
    await setDoc(docRef, Object.assign({}, {...task, id: docRef.id}), {merge: true})
      .then(() => task.id = docRef.id)

    return task
  }


  signInWithEmailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password)
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password)
  }

  unsubscribe() {
    this.subscriptions.forEach(subscription => subscription())
  }


}
