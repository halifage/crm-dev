import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoardsComponent} from "./components/board-list/boards.component";
import {TaskViewComponent} from "./components/task-view/task-view.component";

const routes: Routes = [
  {
    path: '',
    component: BoardsComponent
  },
  {
    path: "task-edit",
    component: TaskViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
