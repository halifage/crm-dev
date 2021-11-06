import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Auth, connectAuthEmulator, onAuthStateChanged} from "@angular/fire/auth";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  authenticated = this.isAuthenticatedSubject as Observable<boolean>;

  constructor(private firebaseAuth: Auth) {
    // connectAuthEmulator(this.firebaseAuth, 'http://localhost:9099');
    // onAuthStateChanged(this.firebaseAuth, user => {
    //   if (user) {
    //     this.isAuthenticatedSubject.next(true)
    //   }
    // })
  }

  setUserAuthentication(isLoggedIn: boolean) {
    this.isAuthenticatedSubject.next(isLoggedIn);
    console.log('Service: setUserAuthentication to: ', isLoggedIn)
  }

  getUserAuthentication(): boolean {
    console.log('Service: getUserAuthentication. returning: ', this.isAuthenticatedSubject.value)
    return this.isAuthenticatedSubject.value;
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password)
  }


  createUserWithEmailAndPassword(email: string, password: string) {
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password)
  }


}
