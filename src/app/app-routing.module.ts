import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoardsComponent} from "./components/board-list/boards.component";
import {TaskViewComponent} from "./components/task-view/task-view.component";
import {HomeComponent} from "./components/home/home.component";
import {AdminConsoleComponent} from "./components/admin-console/admin-console.component";

const routes: Routes = [
  {
    path: 'board',
    component: BoardsComponent
  },
  {
    path: "task-edit",
    component: TaskViewComponent
  },
  {
    path: "admin-console",
    component: AdminConsoleComponent
  },
  {
    path: '**',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
