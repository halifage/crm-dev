import {Component, OnDestroy, OnInit} from '@angular/core';
import {Auth, User, connectAuthEmulator, onAuthStateChanged} from "@angular/fire/auth";
import {FirebaseService} from "./services/firebase.service";
import {Router} from "@angular/router";
import firebase from "firebase/compat";
import Unsubscribe = firebase.Unsubscribe;
import {collection, connectFirestoreEmulator, Firestore, onSnapshot} from "@angular/fire/firestore";
import {Board} from "./model/board";
import {PopupService} from "./services/popup.service";
import {PopupType} from "./enum/popup-type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'crm-dev';

  subscriptions: Unsubscribe[] = [];

  constructor(private firebaseAuth: Auth,
              private firebaseService: FirebaseService,
              private router: Router,
              private firestoreDb: Firestore,
              private toaster: PopupService) {
    // connectAuthEmulator(this.firebaseAuth, 'http://localhost:9099');
    // connectFirestoreEmulator(this.firestoreDb, 'http://localhost', 8080)
  }

  ngOnInit(): void {
    // connectFirestoreEmulator(this.firestoreDb, 'http://localhost', 8080)

    //
    // const authUnsubscribe = onAuthStateChanged(this.firebaseAuth, user => {
    //   if (user) {
    //     this.firebaseService.setCurrentAuthenticatedUser(user)
    //   } else {
    //     this.firebaseService.setCurrentAuthenticatedUser(null)
    //   }
    // });
    //
    // const boardsUnsubscribe = onSnapshot(collection(this.firestoreDb, 'boards'), snapshot => {
    //   let boards: Board[] = []
    //     console.log('App Component: boards snapshot: ', snapshot)
    //   snapshot.forEach(doc => {
    //     boards.push(<Board>doc.data())
    //   })
    //   console.log('App Component: boards : ', boards)
    //
    //   this.firebaseService.setBoards(boards)
    // })
    //
    // const tasksUnsubscribe = onSnapshot(collection(this.firestoreDb, 'tasks'), snapshot => {
    //   let tasks: Task[] = []
    //   snapshot.forEach(doc => {
    //     tasks.push(<Task>doc.data())
    //   })
    //
    //   this.firebaseService.setTasks(tasks)
    // })
    //
    //
    // this.subscriptions.push(authUnsubscribe, boardsUnsubscribe, tasksUnsubscribe);
  }

  signOut() {
    this.firebaseAuth.signOut().then(() => {
      this.router.navigateByUrl('/login')
        .then(() => this.toaster.show("Logout Successful :)"))
        .catch(error => this.toaster.show(error, PopupType.ERROR))
    })
  }

  ngOnDestroy(): void {
    this.firebaseService.unsubscribe()
  }
}
