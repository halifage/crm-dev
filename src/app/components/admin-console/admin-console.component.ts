import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Board} from "../../model/board";
import {BoardService} from "../../services/board.service";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BoardDialogComponent} from "../../dialogs/board-dialog/board-dialog.component";
import {Auth, connectAuthEmulator, createUserWithEmailAndPassword} from "@angular/fire/auth";
import {PopupType} from "../../enum/popup-type";
import {PopupService} from "../../services/popup.service";
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css'],

})
export class AdminConsoleComponent implements OnInit {


  boards: Board[] = [];
  boardTitles: string[] = [];
  addUserForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required)
  });

  constructor(private boardService: BoardService, private dialog: MatDialog, private toaster: PopupService, private firebaseService: FirebaseService) {
    // connectAuthEmulator(this.firebaseAuth, 'http://localhost:9099');
  }

  ngOnInit(): void {
    // this.boardService.getBoards().data.subscribe(boards => this.boards = boards)
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
        this.boards.push({
          title: result,
          tasks: []
        });
      }
    });
  }

  deleteBoard(event: Board) {
    this.boards.splice(this.boards.indexOf(event), 1);
  }

  addTask(title: string) {
    this.boards.filter(board => board.title === title).map(board =>
      board.tasks.push({
        companyName: 'Camrail',
        companyAddress: 'Douala',
        companyIndustry: 'Transport'
      }))
  }

  createUser() {
    this.firebaseService.createUserWithEmailAndPassword(this.addUserForm.get('email')?.value, this.addUserForm.get('password')?.value).then(credential => {
      this.toaster.show('add user successful');
    }).catch(() => this.toaster.show('error while adding in', PopupType.ERROR))
  }
}
