import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {FormUtil} from "../../util/form-util";
import {Client} from "../../model/client";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  clientForm = new FormBuilder().group({
    name: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
    paymentMode: new FormControl(null),
    industry: new FormControl(null, Validators.required),
    annualVolumes: new FormControl(null),
    phone: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.email),
    contactPersonName: new FormControl(null),
    contactPersonEmail: new FormControl(null, Validators.email),
    contactPersonPhone: new FormControl(null),
    contactPersonRole: new FormControl(null)
  })

  constructor(public dialogRef: MatDialogRef<AddClientComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Client) { }

  ngOnInit(): void {
    if (this.data != null && Object.keys(this.data).length > 0) {
      FormUtil.populateClientForm(this.data, this.clientForm)
    }
  }

  addClient() {
    console.log('add client: form value: ', this.clientForm.value)
    const client: Client = {...this.clientForm.value, id: this.data.id}
    this.dialogRef.close(client)
  }
}
