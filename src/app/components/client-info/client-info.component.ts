import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Client} from "../../model/client";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit, OnChanges {

  @Input() client: Client | null = null

  clientForm = new FormBuilder().group({
    name: [{value: null, disabled: true}],
    type: [{value: null, disabled: true}],
    paymentMode: [{value: null, disabled: true}],
    industry: [{value: null, disabled: true}],
    annualVolumes: [{value: null, disabled: true}],
    phone: [{value: null, disabled: true}],
    address: [{value: null, disabled: true}],
    email: [{value: null, disabled: true}],
    contactPersonName: [{value: null, disabled: true}],
    contactPersonEmail: [{value: null, disabled: true}],
    contactPersonPhone: [{value: null, disabled: true}],
    contactPersonRole: [{value: null, disabled: true}]
  })



  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.client.currentValue != null) {
      this.populateClientForm(changes.client.currentValue)
    }
  }

  ngOnInit(): void {

  }


  private populateClientForm(client: Client) {
    this.clientForm.setValue({
      name: client.name || null,
      type: client.type || null,
      paymentMode: client.paymentMode || null,
      industry: client.industry || null,
      annualVolumes: client.annualVolumes || null,
      phone: client.phone || null,
      address: client.address || null,
      email: client.email || null,
      contactPersonName: client.contactPersonName || null,
      contactPersonEmail: client.contactPersonEmail || null,
      contactPersonPhone: client.contactPersonPhone || null,
      contactPersonRole: client.contactPersonRole || null,
    })
  }

}
