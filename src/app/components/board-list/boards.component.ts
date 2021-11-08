import {Component, OnInit} from '@angular/core';
import {Board} from "../../model/board";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {TaskDialogComponent} from "../../dialogs/task-dialog/task-dialog.component";
import {FirebaseService} from "../../services/firebase.service";
import {ProspectiveClient} from "../../model/prospective-client";
import {NotesHistory} from "../../model/notes-history";
import {User} from "@angular/fire/auth";

@Component({
  selector: 'app-board-list',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css'],

})
export class BoardsComponent implements OnInit {

  currentUser: User | null = null;
  boards: Board[] = [];
  displayedBoards: Board[] = [];
  tasks: ProspectiveClient[] = [];
  displayedTasks: ProspectiveClient[] = [];
  boardTitles: string[] = [];

  constructor(private firebaseService: FirebaseService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.firebaseService.getBoards().subscribe(boards => {
      this.boards = boards
      this.displayedBoards = boards

      this.firebaseService.getTasks().subscribe(tasks => {
        // console.log('Boards: tasks: ', tasks)
        this.tasks = tasks
        this.displayedTasks = tasks
        this.populateBoards(this.tasks, this.displayedBoards)
        this.boardTitles = this.boards.map(board => board.title);
      })
    })

    this.firebaseService.getCurrentAuthenticatedUser().subscribe(user => this.currentUser = user)
  }

  populateBoards(tasks: ProspectiveClient[], boards: Board[]) {
    boards.forEach(board => {
      board.tasks = tasks.filter(task => task.currentColumn === board.title)
    })
    // console.log('Boards: populated boards: ', boards)
  }

  drop(event: CdkDragDrop<ProspectiveClient[] | any, any>) {
    console.log('event: ', event)
    if (event.container === event.previousContainer) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    }
    const item: ProspectiveClient = event.previousContainer.data[event.previousIndex];

    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);


    console.log('item', item)
    item.currentColumn = event.container.id
    this.firebaseService.updateTask(item).then()
  }

  addTask(title: string) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: "50em",
      data: {column: title}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('dialog result: task: ', result.task)
        const task: ProspectiveClient = result.task
        let noteHistory: NotesHistory = {}

        task.lastUpdatedDate = new Date()
        if (task.createdDate === null) {
          task.createdDate = new Date()
          noteHistory.date = task.createdDate
          noteHistory.text = 'Created item: '
        } else {
          noteHistory.date = task.lastUpdatedDate
          noteHistory.text = 'Updated item: '
        }

        if (task.assignedAgentNotes?.length) {
          noteHistory.text = noteHistory.text.concat('\tNOTE: '.concat(task.assignedAgentNotes))
        }

        if (task.nextMeetingDate != null) {
          const nextMeetingDate = task.nextMeetingDate;
          noteHistory.text = noteHistory.text.concat('\tNEXT MEETING DATE: '.concat(`${nextMeetingDate.getDay()}/${nextMeetingDate.getMonth()}/${nextMeetingDate.getFullYear()}`))
        }

        task.currentColumn = title
        noteHistory.agentName = this.currentUser?.displayName || this.currentUser?.email || ""
        noteHistory.userId = this.currentUser?.uid
        task.history = task.history || []
        task.history.push(noteHistory)
        this.firebaseService.createTask(task).then((task) => console.log('task created: ', task));
      }
    });
  }

  filterBoards(filterString: string) {
    // this.displayedTasks = this.displayedTasks.filter( => {
    //   const tasks = board.tasks
    //   if (tasks.)
    // })
  }
}
