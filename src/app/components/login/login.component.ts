import {Component, OnInit} from '@angular/core';
import {Auth, connectAuthEmulator, signInWithEmailAndPassword} from "@angular/fire/auth";
import * as firebaseui from "firebaseui";
import {PopupService} from "../../services/popup.service";
import Config = firebaseui.auth.Config;
import {FirebaseApp, getApp} from "@angular/fire/app";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PopupType} from "../../enum/popup-type";
import {Router} from "@angular/router";
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required)
  })

  constructor(private firebaseAuth: Auth, private toaster: PopupService, private router: Router, private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
  }

  signInUser() {
    this.firebaseService.signInWithEmailAndPassword(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).then(credential => {
      console.log(credential)
      // credential.user.getIdTokenResult(true).then(token => {
      //   if (!!token.claims.admin) {
      //   } else if (!!token.claims.sales) {
      //     this.toaster.show('user is Sales', PopupType.INFO)
      //   }
      // })
      this.toaster.show('login successful');
      // this.router.navigateByUrl('/admin-console').then();
    }).catch(() => this.toaster.show('error while login in', PopupType.ERROR))
  }
}
