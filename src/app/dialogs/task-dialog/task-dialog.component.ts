import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProspectiveClient} from "../../model/prospective-client";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {NotesHistory} from "../../model/notes-history";
import {MatTableDataSource} from "@angular/material/table";

export interface TaskDialogData {
  task?: ProspectiveClient;
  column?: string;
  enableDelete?: boolean;
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
  notesHistory: NotesHistory[] = [];
  boardTitle = this.data.column;
  taskForm = this.fb.group({
    companyName: new FormControl(),
    companyAddress: new FormControl(),
    companyIndustry: new FormControl(),
    contactPersonEmail: new FormControl(),
    contactPersonPhone: new FormControl(),
    contactPersonRole: new FormControl(),
    companyType: new FormControl(),
    contactPersonAtCompany: new FormControl(),
    decisionMakerAtCompany: new FormControl(),
    decisionMakerPhone: new FormControl(),
    decisionMakerEmail: new FormControl(),
    assignedAgentName: new FormControl(),
    assignedAgentNotes: new FormControl(),
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
    if (this.data.task) {
      this.populateTaskFields(this.data.task)
    }
  }

  populateTaskFields(task: ProspectiveClient) {
    this.taskForm.setValue({
      companyName: this.data.task?.companyName,
      companyAddress: this.data.task?.companyAddress,
      companyIndustry: this.data.task?.companyIndustry,
      contactPersonEmail: this.data.task?.contactPersonEmail,
      contactPersonPhone: this.data.task?.contactPersonPhone,
      contactPersonRole: this.data.task?.contactPersonRole,
      companyType: this.data.task?.companyType,
      contactPersonAtCompany: this.data.task?.contactPersonAtCompany,
      decisionMakerAtCompany: this.data.task?.decisionMakerAtCompany,
      decisionMakerPhone: this.data.task?.decisionMakerPhone,
      decisionMakerEmail: this.data.task?.decisionMakerEmail,
      assignedAgentName: this.data.task?.assignedAgentName,
      assignedAgentNotes: this.data.task?.assignedAgentNotes
    })
  }

  cancel(): void {
    this.dialogRef.close(this.data);
  }


  submitTask() {
    const dialogResult: TaskDialogData = {
      ...this.data,
      task: this.taskForm.value
    }
    this.dialogRef.close(dialogResult)
  }
}
