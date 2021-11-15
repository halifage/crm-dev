import {Component, OnInit} from '@angular/core';
import {Client} from "../../model/client";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatDialog} from "@angular/material/dialog";
import {BoardDialogComponent} from "../../dialogs/board-dialog/board-dialog.component";
import {AddClientComponent} from "../../dialogs/add-client/add-client.component";

@Component({
  selector: 'app-client-component',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  selectedClient: Client | null = null;
  filteredClients: Observable<Client[]> | undefined;
  clientInputControl = new FormControl();


  constructor(private dialog: MatDialog,) {
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
        industry: 'Industry of the client',
        contactPersonRole: 'Manager',
        contactPersonPhone: 123456789,
        contactPersonEmail: 'contact@company.com',
        contactPersonName: 'Contact Name',
        email: 'info@company.com',
        phone: 123456789,
        annualVolumes: 1000,
        paymentMode: 'Cash',
        type: 'Category A'
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



  private filterClients(value: string) {
    console.log('value: ', value)
    return this.clients.filter(client => client.name?.toLowerCase().includes(value.toLowerCase()))
  }

  displayFunction(client: Client): string {
    return client && client.name ? client.name : ""
  }

  handleSelectedClient(selectedClient: Client) {
    console.log('selected client: ', selectedClient)
    this.selectedClient = selectedClient
  }

  clearSearch() {
    this.selectedClient = null
    this.clientInputControl.reset()
  }

  addClient() {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: "50em",
      height: "50em",
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Client captured: ', result)
        this.selectedClient = result
        // save client

      }
    });
  }
}
