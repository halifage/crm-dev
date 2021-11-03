import {Component, OnInit} from '@angular/core';
import {Board} from "../../model/board";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {BoardService} from "../../services/board.service";
import {MatDialog} from "@angular/material/dialog";
import {BoardDialogComponent} from "../board-dialog/board-dialog.component";

@Component({
  selector: 'app-board-list',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  boards: Board[] = [];
  items: string[] = [];

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
        title: 'Board 2',
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
        title: 'Board 2',
        tasks: [{
          companyName: 'Bollore',
          companyAddress: 'somewhere',
          companyIndustry: 'something'
        }]
      });
  }

  drop($event: CdkDragDrop<Board[], any>) {

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

  addBoard() {
    this.items.push('item');
  }
}
