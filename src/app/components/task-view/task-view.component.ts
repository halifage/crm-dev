import { Component, OnInit } from '@angular/core';
import {NotesHistory} from "../../model/notes-history";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.notesHistory.push({
        date: new Date(),
        text: "notes for history",
        agentName: "halifage"
      },
      {
        date: new Date(),
        text: "notes for history 2 ljlssflkgslpk vdkspns pkmofgjo[s dafdapkkfs'lmdal;jfj;kadf;mslakfladk'lfkadkfla'dklms.mdsmgfd,mslgmfs,mgfs;",
        agentName: "halifax"
      });

    this.notesHistoryDataSource.data = this.notesHistory;
  }

  cancel() {

  }
}
