import {Component, OnInit} from '@angular/core';
import {Client} from "../../model/client";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatDialog} from "@angular/material/dialog";
import {BoardDialogComponent} from "../../dialogs/board-dialog/board-dialog.component";
import {AddClientComponent} from "../../dialogs/add-client/add-client.component";
import {FirebaseService} from "../../services/firebase.service";
import {PopupService} from "../../services/popup.service";
import {User} from "@angular/fire/auth";
import {fakeAsync} from "@angular/core/testing";

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
  showSpinner: boolean = false;

  constructor(private dialog: MatDialog, private firebaseService: FirebaseService, private toaster: PopupService) {
  }

  ngOnInit(): void {
    this.showSpinner = true
    this.firebaseService.getClients().subscribe(clients => {
      console.log('On Init: Clients: ', clients)
      this.clients = clients
      this.showSpinner = false
    }, error => this.showSpinner = false)

    this.filteredClients = this.clientInputControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === "string" ? value : value?.name)),
      map(name => name ? this.filterClients(name) : this.clients.slice())
    )
  }



  private filterClients(value: string) {
    return this.clients.filter(client => client.name?.toLowerCase().includes(value.toLowerCase()))
  }

  displayFunction(client: Client): string {
    return client && client.name ? client.name : ""
  }

  handleSelectedClient(selectedClient: Client) {
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
      this.showSpinner = true
      if (result) {
        this.firebaseService.createClient(result).then(client => {
          this.selectedClient = client
          this.showSpinner = false
          this.toaster.show('Added successfully :)')
        }).finally(() => this.showSpinner = false)
      }
      this.showSpinner = false
    });
  }

  updateClient() {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: "50em",
      height: "50em",
      data: this.selectedClient
    });

    dialogRef.afterClosed().subscribe((result: Client) => {
      this.showSpinner = true
      if (result) {
        console.log('result: ', result)
        this.firebaseService.updateClient(result).then(client => {
          this.selectedClient = client
          this.showSpinner = false
          this.toaster.show('Updated successfully :)')
        }).finally(() => this.showSpinner = false)
      }
      this.showSpinner = false
    });
  }
}
