import { EventEmitter } from '@angular/core';
import {Component, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ProspectiveClient} from "../../model/prospective-client";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: ProspectiveClient | null = null;
  @Output() edit = new EventEmitter<ProspectiveClient>();

  constructor() { }

  ngOnInit(): void {
  }

}
