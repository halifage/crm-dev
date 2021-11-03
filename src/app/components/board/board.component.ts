import {Component, Input, OnInit} from '@angular/core';
import {ProspectiveClient} from "../../model/prospective-client";
import {Board} from "../../model/board";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";
import {BoardService} from "../../services/board.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() board: Board | null = null;
  tasks: ProspectiveClient[] = [];

  constructor(private boardService: BoardService, private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  taskDrop(event: CdkDragDrop<ProspectiveClient[]>) {
    // moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    // this.boardService.updateTasks(this.board?.id, this.board?.tasks);
  }

  openDialog(task?: Task, idx?: number): void {
    // const newTask = { label: "purple" };
    // const dialogRef = this.dialog.open(TaskDialogComponent, {
    //   width: "500px",
    //   data: task
    //     ? { task: { ...task }, isNew: false, boardId: this.board.id, idx }
    //     : { task: newTask, isNew: true }
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
      // if (result) {
      //   if (result.isNew) {
      //     this.boardService.updateTasks(this.board.id, [
      //       ...this.board.tasks,
      //       result.task
      //     ]);
      //   } else {
      //     const update = this.board.tasks;
      //     update.splice(result.idx, 1, result.task);
      //     this.boardService.updateTasks(this.board.id, this.board.tasks);
      //   }
      // }
    // });
  }

  handleDelete() {
    // this.boardService.deleteBoard(this.board.id);
  }

}
