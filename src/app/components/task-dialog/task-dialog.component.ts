import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProspectiveClient} from "../../model/prospective-client";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

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
  private backupTask: Partial<ProspectiveClient> = { ...this.data.task };

  @Input() task: ProspectiveClient | null = null;

  taskForm = this.fb.group({
    companyName: new FormControl(null, Validators.required),
    companyAddress: new FormControl(null, Validators.required),
    companyIndustry: new FormControl(null, Validators.required),
  })
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {}

  ngOnInit(): void {
  }

  cancel(): void {
    // this.data.task.title = this.backupTask.title;
    // this.data.task.description = this.backupTask.description;
    this.dialogRef.close(this.data);
  }





}
