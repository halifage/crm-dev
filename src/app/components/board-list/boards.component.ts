import {Component, OnInit} from '@angular/core';
import {Board} from "../../model/board";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {BoardService} from "../../services/board.service";
import {MatDialog} from "@angular/material/dialog";
import {BoardDialogComponent} from "../board-dialog/board-dialog.component";
import {ProspectiveClient} from "../../model/prospective-client";

@Component({
  selector: 'app-board-list',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
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
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: "25em",
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
}
