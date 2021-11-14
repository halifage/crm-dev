import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  clientForm = new FormBuilder().group({
    name: new FormControl(null),
    type: new FormControl(null),
    paymentMode: new FormControl(null),
    industry: new FormControl(null),
    annualVolumes: new FormControl(null),
    phone: new FormControl(null),
    address: new FormControl(null),
    email: new FormControl(null),
    contactPersonName: new FormControl(null),
    contactPersonEmail: new FormControl(null),
    contactPersonPhone: new FormControl(null),
    contactPersonRole: new FormControl(null)
  })

  constructor(public dialogRef: MatDialogRef<AddClientComponent>,
  @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

}
