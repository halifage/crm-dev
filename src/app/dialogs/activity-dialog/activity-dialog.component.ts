import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Activity} from "../../model/activity";
import {FirestoreUtils} from "../../util/FirestoreUtils";

@Component({
  selector: 'app-activity-dialog',
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.css']
})
export class ActivityDialogComponent implements OnInit {

  activityForm = new FormBuilder().group({
    title: new FormControl(null),
    status: new FormControl(null),
    agentName: new FormControl(null),
    accountStatus: new FormControl(null),
    claim: new FormControl(null),
    pendingTransaction: new FormControl(null),
    businessProspect: new FormControl(null),
    meetingReport: new FormControl(null),
    nextMeetingDate: new FormControl(null)
  })

  constructor(public dialogRef: MatDialogRef<ActivityDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Activity) { }


  ngOnInit(): void {
    if (this.data) {
      this.populateForm()
    }
  }

  saveActivity() {
    this.dialogRef.close(this.activityForm.value)
  }

  populateForm() {
    this.activityForm.setValue({
      title: this.data.title,
      status: this.data.status,
      agentName: this.data.agentName,
      accountStatus: this.data.accountStatus,
      claim: this.data.claim,
      pendingTransaction: this.data.pendingTransaction,
      businessProspect: this.data.businessProspect,
      nextMeetingDate: FirestoreUtils.convertFirestoreTimestampToDate(this.data.nextMeetingDate),
      meetingReport: this.data.meetingReport
    })
  }
}
