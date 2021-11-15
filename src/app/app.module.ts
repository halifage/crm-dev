import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {MaterialModule} from "./material/material.module";
import {TaskComponent} from './components/task/task.component';
import {TasksSummaryComponent} from './components/tasks-summary/tasks-summary.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BoardComponent} from './components/board/board.component';
import {BoardsComponent} from "./components/board-list/boards.component";
import {TaskViewComponent} from './components/task-view/task-view.component';
import {HomeComponent} from './components/home/home.component';
import {AdminConsoleComponent} from './components/admin-console/admin-console.component';
import {ConfirmationDialogComponent} from './dialogs/confirmation-dialog/confirmation-dialog.component';
import {PopupComponent} from './dialogs/popup/popup.component';
import {TaskDialogComponent} from "./dialogs/task-dialog/task-dialog.component";
import {BoardDialogComponent} from "./dialogs/board-dialog/board-dialog.component";
import {LoginComponent} from './components/login/login.component';
import {AuthGuardModule} from "@angular/fire/auth-guard";
import { TaskOverviewComponent } from './components/task-overview/task-overview.component';
import { ClientComponent } from './components/client/client.component';
import {FilteredSelectComponent} from "./shared/filtered-select/filtered-select.component";
import { AddClientComponent } from './dialogs/add-client/add-client.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TasksSummaryComponent,
    TaskDialogComponent,
    BoardsComponent,
    BoardComponent,
    BoardDialogComponent,
    TaskViewComponent,
    HomeComponent,
    AdminConsoleComponent,
    ConfirmationDialogComponent,
    PopupComponent,
    LoginComponent,
    TaskOverviewComponent,
    ClientComponent,
    FilteredSelectComponent,
    AddClientComponent,
    ClientInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    FormsModule,
    AuthGuardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
