import { Component, OnInit } from '@angular/core';
import {Auth, connectAuthEmulator} from "@angular/fire/auth";
import firebase from "firebase/compat";
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import PhoneAuthProvider = firebase.auth.PhoneAuthProvider;
import * as firebaseui from "firebaseui";
import {PopupService} from "../../services/popup.service";
import {PopupType} from "../../enum/popup-type";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  firebaseUi: firebaseui;
  constructor(private firebaseAuth: Auth, private toaster: PopupService) {
    connectAuthEmulator(this.firebaseAuth, 'localhost', 9099);
  }

  ngOnInit(): void {
    const uiConfig = {
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        {
          provider: PhoneAuthProvider.PROVIDER_ID,
          defaultCountry: 'ZA',
          defaultNationalNumber: '0679132994',
          loginHint: '+27 67 913 2994',
          whitelistedCountries: ['+27', '+237']
        }
      ],
      signInSuccessUrl: this.onLoginSuccess.bind(this)
    };

    this.firebaseUi = new firebaseui.auth.AuthUI(this.firebaseAuth);

    this.firebaseUi.start('#firebaseui-auth-container', uiConfig);
  }

  onLoginSuccess(loginResult: any) {
    this.toaster.show('Login Successful');
  }

}
