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
import { TaskComponent } from './components/task/task.component';
import { TasksSummaryComponent } from './components/tasks-summary/tasks-summary.component';
import {TaskDialogComponent} from "./components/task-dialog/task-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BoardComponent } from './components/board/board.component';
import {BoardsComponent} from "./components/board-list/boards.component";
import { BoardDialogComponent } from './components/board-dialog/board-dialog.component';
import {FirestoreUtils} from "./Utils/FirestoreUtils";
import { TaskViewComponent } from './components/task-view/task-view.component';
import { HomeComponent } from './components/home/home.component';
import { AdminConsoleComponent } from './components/admin-console/admin-console.component';

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
    AdminConsoleComponent
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
