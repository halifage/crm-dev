import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PopupService} from "../../services/popup.service";
import {PopupType} from "../../enum/popup-type";
import {ConfirmationDialogComponent} from "../../dialogs/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      // width: '500px',
      data: {
        title: 'Confirm Action',
        message: 'All images have been captured. Do you want to go to the Client Pack screen?'
      }
    })
  }

}
