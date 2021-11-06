import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopupType} from "../enum/popup-type";
import {PopupComponent} from "../dialogs/popup/popup.component";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  duration = 3000;
  constructor(private snackbar: MatSnackBar) { }

  show(message: string, type: string = PopupType.SUCCESS, duration = this.duration, action?: string) {
    this.snackbar.open( message, action,{
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [type],
      data: message
    });
  }

  dismiss() {
    this.snackbar.dismiss()
  }
}
