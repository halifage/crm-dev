import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ProspectiveClient} from "../../model/prospective-client";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],

})
export class TaskComponent implements OnInit {

  @Input() task: ProspectiveClient | null = null;
  @Output() edit = new EventEmitter<ProspectiveClient>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  editTask(task: ProspectiveClient | null) {
    this.router.navigateByUrl('/task-edit', {
      state: {
        task: task
      }
    }).then()
  }
}
