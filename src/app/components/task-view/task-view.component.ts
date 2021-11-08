import {Component, OnInit} from '@angular/core';
import {NotesHistory} from "../../model/notes-history";
import {FormBuilder, FormControl} from "@angular/forms";
import {FirebaseService} from "../../services/firebase.service";
import {Router} from "@angular/router";
import {ProspectiveClient} from "../../model/prospective-client";
import {Timestamp} from "@angular/fire/firestore";
import {User} from "@angular/fire/auth";

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  notesHistory: NotesHistory[] | undefined = [];
  taskForm = this.fb.group({
    companyName: new FormControl(null),
    companyAddress: new FormControl(null),
    companyIndustry: new FormControl(null),
    contactPersonEmail: new FormControl(null),
    contactPersonPhone: new FormControl(null),
    contactPersonRole: new FormControl(null),
    companyType: new FormControl(null),
    contactPersonAtCompany: new FormControl(null),
    decisionMakerAtCompany: new FormControl(null),
    decisionMakerPhone: new FormControl(null),
    decisionMakerEmail: new FormControl(null),
    assignedAgentName: new FormControl(null),
    assignedAgentNotes: new FormControl(null),
    nextMeetingDate: new FormControl(null),
    id: new FormControl(null),
    history: new FormControl(null),
    lastUpdatedDate: new FormControl(null),
    createdDate: new FormControl(null),
    currentColumn: new FormControl(null),
    statusColor: new FormControl(null),
    userId: new FormControl(null)
  });
  private currentUser: User | null = null;

  constructor(private fb: FormBuilder, private firebaseService: FirebaseService, private router: Router) {
    console.log('task edit: ', history.state.task)
  }

  ngOnInit(): void {
    const task: ProspectiveClient = history.state.task
    this.notesHistory = task.history
    this.notesHistory?.forEach(note => {
      const noteDate = note.date
      if(noteDate instanceof Timestamp) {
        console.log('date is instance of Timestamp')
        note.date = noteDate.toDate()
      }
    })

    this.populateTaskFields(task)
    this.firebaseService.getCurrentAuthenticatedUser().subscribe(user => this.currentUser = user)
  }


  populateTaskFields(task: ProspectiveClient) {
    this.taskForm.setValue({
      companyName: task.companyName || null,
      companyAddress: task.companyAddress || null,
      companyIndustry: task.companyIndustry || null,
      contactPersonEmail: task.contactPersonEmail || null,
      contactPersonPhone: task.contactPersonPhone || null,
      contactPersonRole: task.contactPersonRole || null,
      companyType: task.companyType || null,
      contactPersonAtCompany: task.contactPersonAtCompany || null,
      decisionMakerAtCompany: task.decisionMakerAtCompany || null,
      decisionMakerPhone: task.decisionMakerPhone || null,
      decisionMakerEmail: task.decisionMakerEmail || null,
      assignedAgentName: task.assignedAgentName || null,
      assignedAgentNotes: task.assignedAgentNotes || null,
      nextMeetingDate: task.nextMeetingDate || null,
      id: task.id || null,
      history: task.history || null,
      statusColor: task.statusColor || null,
      lastUpdatedDate: task.lastUpdatedDate || null,
      createdDate: task.createdDate || null,
      currentColumn: task.currentColumn || null,
      userId: task.userId || null
    });
    console.log('taskForm: ', this.taskForm.value)
  }

  saveTask() {
    const task: ProspectiveClient = this.taskForm.value
    let noteHistory: NotesHistory = {}

    noteHistory.date = task.lastUpdatedDate
    noteHistory.text = 'Updated item: '

    if (task.assignedAgentNotes?.length) {
      noteHistory.text = noteHistory.text.concat('\tNOTE: '.concat(task.assignedAgentNotes))
    }

    if (task.nextMeetingDate != null) {
      const nextMeetingDate = task.nextMeetingDate;
      noteHistory.text = noteHistory.text.concat('\tNEXT MEETING DATE: '.concat(`${nextMeetingDate.getDay()}/${nextMeetingDate.getMonth()}/${nextMeetingDate.getFullYear()}`))
    }
    noteHistory.agentName = this.currentUser?.displayName || this.currentUser?.email || ""
    noteHistory.userId = this.currentUser?.uid
    task.history = task.history || []
    task.history.push(noteHistory)
    this.firebaseService.updateTask(task).then((task) => console.log('task updated: ', task));


  }
}
