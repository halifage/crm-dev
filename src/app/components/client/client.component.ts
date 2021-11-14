import {Component, OnInit} from '@angular/core';
import {Client} from "../../model/client";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-client-component',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Observable<Client[]> | undefined;
  clientInputControl = new FormControl();

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

  constructor() {
  }

  ngOnInit(): void {

    this.filteredClients = this.clientInputControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => name ? this.filterClients(name) : this.clients.slice())
    )

    this.clients.push({
        name: 'Client 1',
        address: 'Address of the client',
        industry: 'Industry of the client'
      },
      {
        name: 'Client 2',
        address: 'Address of the client',
        industry: 'Industry of the client'
      },
      {
        name: 'Client 3',
        address: 'Address of the client',
        industry: 'Industry of the client'
      },
      {
        name: 'Client 4',
        address: 'Address of the client',
        industry: 'Industry of the client'
      })
  }

  private populateClientForm(client: Client) {
    this.clientForm.setValue({
      name: client.name,
      type: client.type,
      paymentMode: client.paymentMode,
      industry: client.industry,
      annualVolumes: client.annualVolumes,
      phone: client.phone,
      address: client.address,
      email: client.email,
      contactPersonName: client.contactPersonName,
      contactPersonEmail: client.contactPersonEmail,
      contactPersonPhone: client.contactPersonPhone,
      contactPersonRole: client.contactPersonRole,
    })
  }

  private filterClients(value: string) {
    console.log('value: ', value)
    return this.clients.filter(client => client.name?.toLowerCase().includes(value.toLowerCase()))
  }

  displayFunction(client: Client): string {
    return client && client.name ? client.name : "";
  }

  handleSelectedClient(selectedClient: Client) {
    console.log('selected client: ', selectedClient)
  }
}
