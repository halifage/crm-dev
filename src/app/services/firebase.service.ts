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
import {Client} from "../model/client";
import {FirestoreUtils} from "../util/FirestoreUtils";
import {Activity} from "../model/activity";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  currentAuthenticatedUser = new BehaviorSubject<User | null>(null);
  currentAuthenticatedUserObservable = this.currentAuthenticatedUser as Observable<User>
  boards = new BehaviorSubject<Board[]>([]);
  boardsObservable = this.boards as Observable<Board[]>
  tasks = new BehaviorSubject<ProspectiveClient[]>([]);
  tasksObservable = this.tasks as Observable<ProspectiveClient[]>
  clients = new BehaviorSubject<Client[]>([]);
  clientsObservable = this.clients as Observable<Client[]>
  activities = new BehaviorSubject<Activity[]>([]);
  activitiesObservable = this.activities as Observable<Activity[]>
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
      let tasks: ProspectiveClient[] = []
      snapshot.forEach(doc => {
        // console.log('Service: tasks: ', tasks)
        tasks.push(<ProspectiveClient>doc.data())
      })
      this.tasks.next(tasks)
    })

    const clientsUnsubscribe = onSnapshot(collection(this.firestoreDb, 'clients'), snapshot => {
      let clients: Client[] = []
      snapshot.forEach(doc => {
        let client = <Client>doc.data();
        clients.push({...client, dateCreated: FirestoreUtils.convertFirestoreTimestampToDate(client.dateCreated)})
      })
      this.clients.next(clients)
    })

    const boardsUnsubscribe = onSnapshot(collection(this.firestoreDb, 'boards'), (snapshot) => {
      let boardsList: Board[] = []
      // console.log('App Component: boards snapshot: ', snapshot)
      snapshot.forEach(doc => {
        boardsList.push(<Board>doc.data())
        this.boards.next(boardsList)
      })
    })

    const activitiesUnsubscribe = onSnapshot(collection(this.firestoreDb, 'activities'), (snapshot) => {
      let activities: Activity[] = []
      // console.log('App Component: boards snapshot: ', snapshot)
      snapshot.forEach(doc => {
        const activity = <Activity>doc.data()
          activity.nextMeetingDate = FirestoreUtils.convertFirestoreTimestampToDate(activity.nextMeetingDate);
        activities.push(activity)
        this.activities.next(activities)
      })
    })

    this.subscriptions.push(authUnsubscribe, boardsUnsubscribe, tasksUnsubscribe, clientsUnsubscribe, activitiesUnsubscribe);
  }

  setCurrentAuthenticatedUser(user: User | null) {
    this.currentAuthenticatedUser.next(user);
  }

  getCurrentAuthenticatedUser(): Observable<User> {
    return this.currentAuthenticatedUserObservable;
  }

  getClients(): Observable<Client[]> {
    return this.clientsObservable
  }

  getActivities(): Observable<Activity[]> {
    return this.activitiesObservable
  }

  setBoards(boards: Board[]) {
    // console.log('Service: setBoards: ', boards)
    this.boards.next(boards)
  }

  getBoards(): Observable<Board[]> {
    return this.boardsObservable
  }

  getTasks(): Observable<ProspectiveClient[]> {
    return this.tasksObservable
  }

  async createClient(client: Client): Promise<Client> {
    const docRef = doc(collection(this.firestoreDb, 'clients'))
    await setDoc(docRef, Object.assign({}, {...client, id: docRef.id}))
      .then().catch(error => console.log(`Error creating client ${client}: ${error}`))
    return client
  }

  async updateClient(client: Client): Promise<Client> {
    console.log(`Update client: client: ${client}`)
    const docRef = doc(collection(this.firestoreDb, 'clients'), client.id)
    await setDoc(docRef, Object.assign({}, {...client, id: docRef.id}), {merge: true})
      .then().catch(error => console.log(`Error creating client ${client}: ${error}`))
    return client
  }

  async createActivity(activity: Activity): Promise<Activity> {
    const docRef = doc(collection(this.firestoreDb, 'activities'))
    await setDoc(docRef, Object.assign({}, {...activity, id: docRef.id}))
      .then().catch(error => console.log(`Error creating activity ${activity}: ${error}`))
    return activity
  }

  async updateActivity(activity: Activity): Promise<Activity> {
    const docRef = doc(collection(this.firestoreDb, 'activities'), activity.id)
    await setDoc(docRef, Object.assign({}, activity), {merge: true})
      .then().catch(error => console.log(`Error creating activity ${activity}: ${error}`))
    return activity
  }


  async createBoard(board: Board): Promise<Board> {
    const docRef = doc(collection(this.firestoreDb, 'boards'))
    await setDoc(docRef, Object.assign({}, {...board, id: docRef.id}), {merge: true})
      .then(() => {
        board.id = docRef.id
      })

    return board
  }

  async updateBoard(board: Board): Promise<Board> {
    const docRef = doc(collection(this.firestoreDb, 'boards'), board.id)
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
    const docRef = doc(collection(this.firestoreDb, 'tasks'))
    const currentUser = this.currentAuthenticatedUser.value
    await setDoc(docRef, Object.assign({}, {...task, id: docRef.id}), {merge: true})
      .then()

    return task
  }

  async updateTask(task: ProspectiveClient): Promise<ProspectiveClient> {
    const docRef = doc(collection(this.firestoreDb, 'tasks'), task.id)
    const currentUser = this.currentAuthenticatedUser.value
    await setDoc(docRef, Object.assign({}, {...task, id: docRef.id}), {merge: true})
      .then()

    return task
  }

  deleteFromCollection(task: ProspectiveClient): void {
    const docRef = doc(collection(this.firestoreDb, 'tasks'))
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
