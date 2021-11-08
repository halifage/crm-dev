import {Component, OnDestroy, OnInit} from '@angular/core';
import {Board} from "../../model/board";
import {BoardService} from "../../services/board.service";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BoardDialogComponent} from "../../dialogs/board-dialog/board-dialog.component";
import {PopupType} from "../../enum/popup-type";
import {PopupService} from "../../services/popup.service";
import {FirebaseService} from "../../services/firebase.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css'],

})
export class AdminConsoleComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }


  subscriptions: Subscription[] = []
  boards: Board[] = [];
  addUserForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required)
  });

  constructor(private dialog: MatDialog, private toaster: PopupService, private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    const boardsSubscription = this.firebaseService.getBoards().subscribe(boards => {
      this.boards = boards
      console.log('admin: boards: ', this.boards)
    });

    this.subscriptions.push(boardsSubscription)

  }

  drop(event: CdkDragDrop<any[], any>) {
    if (event.container === event.previousContainer) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    }

    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
  }

  openBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: "25em",
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.firebaseService.createBoard({
          title: result,
          tasks: []
        }).then((board) => {
          this.toaster.show('Column created successfully :)')
          console.log('Created board: ', board)
        })
      }
    });
  }

  deleteBoard(event: Board) {
    this.firebaseService.deleteBoard(event).then(() => {
      console.log('board deleted: ', event, 'boards: ', this.boards)
      this.boards.splice(this.boards.indexOf(event),1)
    })
  }

  createUser() {
    const email = this.addUserForm.get('email')?.value;
    const password = this.addUserForm.get('password')?.value;
    this.firebaseService.createUserWithEmailAndPassword(email, password).then(userCredential => {
      this.toaster.show(`Successfully added user with email: ${userCredential.user.email}`);
      this.addUserForm.reset()
    }).catch(() => this.toaster.show(`An error occurred while adding user with email: ${email}`, PopupType.ERROR))
  }
}
