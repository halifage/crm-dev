import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ProspectiveClient} from "../../model/prospective-client";
import {PopupService} from "../../services/popup.service";
import {FirebaseService} from "../../services/firebase.service";
import {Activity} from "../../model/activity";
import {Client} from "../../model/client";
import {Observable, of} from "rxjs";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  @Input() client: Client | null = null

  displayedColumns: string[] = [
    'title',
    'status',
    'agentAssignedName',
    'accountStatus',
    'claim',
    'pendingTransaction',
    'businessProspect',
    'nextMeetingDate',
    'meetingReport',
    'actions'
  ];

  filterFields: string[] = [
    'status',
    'agentAssignedName',
    'accountStatus',
    'claim',
    'pendingTransaction',
    'businessProspect',
    'meetingReport'
  ]


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null = null;
  dataSource = new MatTableDataSource<Activity>();
  activities: Activity[] = []
  filteredActivities: Activity[] = []
  filter = new FormControl()

  constructor(private toaster: PopupService, private firebaseService: FirebaseService) {
  }


  ngOnInit(): void {
    this.filter.valueChanges.subscribe(value => {
      this.filteredActivities = this.filterActivities(value)
      this.dataSource.data = this.filteredActivities
    })

    this.activities = [
      {
        title: 'Activity 1',
        status: 'Pending',
        agentName: 'Halif Sarki',
        accountStatus: 'account status 1',
        claim: 'claim 1',
        pendingTransaction: 'pending transaction 1',
        businessProspect: 'business prospect 1',
        nextMeetingDate: new Date(),
        meetingReport: 'meeting with the client and this is what transpired'
      },
      {
        title: 'Activity 2',
        status: 'Done',
        agentName: 'Halif Sarki',
        accountStatus: 'account status 2',
        claim: 'claim 2',
        pendingTransaction: 'pending transaction 2',
        businessProspect: 'business prospect 2',
        nextMeetingDate: new Date(),
        meetingReport: 'meeting with the client and this is what transpired'
      },
      {
        title: 'Activity 3',
        status: 'Pending',
        agentName: 'Halif Sarki',
        accountStatus: 'account status 3',
        claim: 'claim 3',
        pendingTransaction: 'pending transaction 3',
        businessProspect: 'business prospect 3',
        nextMeetingDate: new Date(),
        meetingReport: 'meeting with the client and this is what transpired'
      },
      {
        title: 'Activity 4',
        status: 'Pending',
        agentName: 'Halif Sarki',
        accountStatus: 'account status 4',
        claim: 'claim 4',
        pendingTransaction: 'pending transaction 4',
        businessProspect: 'business prospect 4',
        nextMeetingDate: new Date(),
        meetingReport: 'meeting with the client and this is what transpired'
      },
      {
        title: 'Activity 5',
        status: 'Done',
        agentName: 'Halif Sarki',
        accountStatus: 'account status 5',
        claim: 'claim 5',
        pendingTransaction: 'pending transaction 5',
        businessProspect: 'business prospect 5',
        nextMeetingDate: new Date(),
        meetingReport: 'meeting with the client and this is what transpired'
      }, {
        title: 'Activity 1',
        status: 'Pending',
        agentName: 'Halif Sarki',
        accountStatus: 'account status 1',
        claim: 'claim 1',
        pendingTransaction: 'pending transaction 1',
        businessProspect: 'business prospect 1',
        nextMeetingDate: new Date(),
        meetingReport: 'meeting with the client and this is what transpired'
      },
      {
        title: 'Activity 2',
        status: 'Done',
        agentName: 'Halif Sarki',
        accountStatus: 'account status 2',
        claim: 'claim 2',
        pendingTransaction: 'pending transaction 2',
        businessProspect: 'business prospect 2',
        nextMeetingDate: new Date(),
        meetingReport: 'meeting with the client and this is what transpired'
      },
      {
        title: 'Activity 3',
        status: 'Pending',
        agentName: 'Halif Sarki',
        accountStatus: 'account status 3',
        claim: 'claim 3',
        pendingTransaction: 'pending transaction 3',
        businessProspect: 'business prospect 3',
        nextMeetingDate: new Date(),
        meetingReport: 'meeting with the client and this is what transpired'
      },
      {
        title: 'Activity 4',
        status: 'Pending',
        agentName: 'Halif Sarki',
        accountStatus: 'account status 4',
        claim: 'claim 4',
        pendingTransaction: 'pending transaction 4',
        businessProspect: 'business prospect 4',
        nextMeetingDate: new Date(),
        meetingReport: 'meeting with the client and this is what transpired'
      },
      {
        title: 'Activity 5',
        status: 'Done',
        agentName: 'Halif Sarki',
        accountStatus: 'account status 5',
        claim: 'claim 5',
        pendingTransaction: 'pending transaction 5',
        businessProspect: 'business prospect 5',
        nextMeetingDate: new Date(),
        meetingReport: 'meeting with the client and this is what transpired'
      },
    ]
    this.filteredActivities = this.activities
    this.dataSource.data = this.filteredActivities
    this.dataSource.paginator = this.paginator;
  }

  addActivity() {

  }

  editActivity(activity: Activity) {
    console.log('activity to edit: ', activity)
  }

  private filterActivities(filterValue: string): Activity[] {
    return this.activities.filter((activity: any) => {
      const match = Object.keys(activity).find((field: string) =>
        this.filterFields.includes(field) && activity[field].toLowerCase().includes(filterValue.toLowerCase()))
      return !!match;
    })
  }

  clearFilter() {
    this.filter.reset('')
    this.dataSource.data = this.activities
  }
}
