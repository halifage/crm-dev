import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {PopupService} from "../../services/popup.service";
import {ProspectiveClient} from "../../model/prospective-client";

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.css']
})
export class TaskOverviewComponent implements OnInit {

  // This data structure is used to accumulate the filtering parameters.
  filters: Map<string, string> = new Map<string, string>();

  displayedColumns: string[] = [
    'prospect',
    'assignedAgentName',
    'createdDate',
    'columnTitle',
    'lastUpdatedDate',
    'assignedAgentNotes'
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null = null;
  dataSource = new MatTableDataSource<ProspectiveClient>();
  tasks: ProspectiveClient[] = []

  constructor(private toaster: PopupService) {
  }

  ngOnInit() {
    this.setTableData(this.tasks)
  }

  setTableData(tasks: ProspectiveClient[]) {
    this.dataSource.data = tasks;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.createFilter();
  }

  createFilter() {
    const filterFunction = function (data: any, filter: string): boolean {
      const searchTerms = JSON.parse(filter);
      const entries = Object.entries(searchTerms);

      return entries.every((tuple, index, array) => {
        const [key, value] = tuple;
        if (value === '') return true;
        else {
          // In some cases, the data can contain null values.
          // So we need to check for those.
          if (data[key]) {
            return data[key].toLowerCase().includes((value as string).toLowerCase().trim());
          } else return false;
        }
      });
    };
    return filterFunction;
  }

  clearFilter(columnName: string) {
    this.filterTasks(columnName);
  }

  filterTasks(columnName: string, event?: Event) {
    let inputValue = '';
    if (event) {
      const element = event.target as HTMLInputElement;
      inputValue = element.value;
    }
    // @ts-ignore
    this.filters[columnName] = inputValue;
    this.dataSource.filter = JSON.stringify(this.filters);
  }


}
