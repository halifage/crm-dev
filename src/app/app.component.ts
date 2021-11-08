import {Component, OnDestroy, OnInit} from '@angular/core';
import {Auth, User, connectAuthEmulator, onAuthStateChanged} from "@angular/fire/auth";
import {FirebaseService} from "./services/firebase.service";
import {Router, RouterOutlet} from "@angular/router";
import firebase from "firebase/compat";
import Unsubscribe = firebase.Unsubscribe;
import {collection, connectFirestoreEmulator, Firestore, onSnapshot} from "@angular/fire/firestore";
import {Board} from "./model/board";
import {PopupService} from "./services/popup.service";
import {PopupType} from "./enum/popup-type";
import {slideInAnimation} from "./animations/animation";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'CRM';

  subscriptions: Unsubscribe[] = [];

  constructor(private firebaseAuth: Auth,
              private firebaseService: FirebaseService,
              private router: Router,
              private firestoreDb: Firestore,
              private toaster: PopupService) {
  }

  ngOnInit(): void {
    this.router.navigateByUrl('/home').then()
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

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
