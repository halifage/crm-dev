import {Component, OnInit} from '@angular/core';
import {Auth, connectAuthEmulator, onAuthStateChanged} from "@angular/fire/auth";
import {FirebaseService} from "./services/firebase.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crm-dev';

  constructor(public firebaseAuth: Auth, private firebaseService: FirebaseService, private router: Router) {
    connectAuthEmulator(this.firebaseAuth, 'http://localhost:9099');
    onAuthStateChanged(this.firebaseAuth, user => {
      if (user) {
        console.log('APP Component: signed in')
      } else {
        console.log('APP Component: signed out')
      }
    })
  }
  ngOnInit(): void {

  }

  signOut() {
    this.firebaseAuth.signOut().then(() => this.router.navigateByUrl('/login'))
  }
}
