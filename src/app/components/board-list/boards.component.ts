import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Board} from "../../model/board";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {BoardService} from "../../services/board.service";
import {MatDialog} from "@angular/material/dialog";
import {TaskDialogComponent} from "../../dialogs/task-dialog/task-dialog.component";

@Component({
  selector: 'app-board-list',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css'],

})
export class BoardsComponent implements OnInit {

  boards: Board[] = [];
  boardTitles: string[] = [];

  constructor(private boardService: BoardService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.boardService.getBoards().data.subscribe(boards => this.boards = boards)
    this.boards.push({
        title: 'Board 1',
        tasks: [{
          companyName: 'Bollore',
          companyAddress: 'somewhere',
          companyIndustry: 'something'
        }]
      },
      {
        title: 'Board 2',
        tasks: [{
          companyName: 'Bollore',
          companyAddress: 'somewhere',
          companyIndustry: 'something'
        }]
      },
      {
        title: 'Board 3',
        tasks: [{
          companyName: 'Bollore',
          companyAddress: 'somewhere',
          companyIndustry: 'something'
        }]
      },
      {
        title: 'Board 4',
        tasks: [{
          companyName: 'Bollore',
          companyAddress: 'somewhere',
          companyIndustry: 'something'
        }]
      },
      {
        title: 'Board 5',
        tasks: [{
          companyName: 'Bollore',
          companyAddress: 'somewhere',
          companyIndustry: 'something'
        }]
      });

    this.boardTitles = this.boards.map(board => board.title);
  }

  drop(event: CdkDragDrop<any[], any>) {
    if (event.container === event.previousContainer) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    }

    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
  }

  openBoardDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: "50em",
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.boardService.createBoard({
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
}
