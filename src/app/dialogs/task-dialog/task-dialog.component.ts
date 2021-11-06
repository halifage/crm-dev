import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProspectiveClient} from "../../model/prospective-client";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {NotesHistory} from "../../model/notes-history";
import {MatTableDataSource} from "@angular/material/table";

export interface TaskDialogData {
  task: Partial<ProspectiveClient>;
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task: ProspectiveClient;
  delete?: boolean;
}

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
  private backupTask: Partial<ProspectiveClient> = {...this.data.task};

  notesHistory: NotesHistory[] = [];

  taskForm = this.fb.group({
    companyName: new FormControl(null, Validators.required),
    companyAddress: new FormControl(null, Validators.required),
    companyIndustry: new FormControl(null, Validators.required),
    contactEmail: new FormControl(null, Validators.email),
    contactPhone: new FormControl(null),
    contactRole: new FormControl(null),
    companyType: new FormControl(null),
    contactName: new FormControl(null),
    decisionMakerName: new FormControl(null),
    decisionMakerPhone: new FormControl(null),
    decisionMakerEmail: new FormControl(null, Validators.email),
    assignee: new FormControl(null),
    agentNotes: new FormControl(null),
  });

  notesHistoryDataSource = new MatTableDataSource<NotesHistory>();
  notesHistoryColumns = ['date', 'agentName', 'note'];


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {
  }

  ngOnInit(): void {
    this.notesHistory.push({
        date: new Date(),
        text: "notes for history",
        agentName: "halifage"
      },
      {
        date: new Date(),
        text: "notes for history 2",
        agentName: "halifax"
      });

    this.notesHistoryDataSource.data = this.notesHistory;
  }

  cancel(): void {
    // this.data.task.title = this.backupTask.title;
    // this.data.task.description = this.backupTask.description;
    this.dialogRef.close(this.data);
  }


}
