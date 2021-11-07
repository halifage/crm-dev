import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoardsComponent} from "./components/board-list/boards.component";
import {TaskViewComponent} from "./components/task-view/task-view.component";
import {HomeComponent} from "./components/home/home.component";
import {AdminConsoleComponent} from "./components/admin-console/admin-console.component";
import {LoginComponent} from "./components/login/login.component";
import {redirectUnauthorizedTo, AuthGuard, redirectLoggedInTo} from "@angular/fire/auth-guard";
import {TaskOverviewComponent} from "./components/task-overview/task-overview.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: 'board',
    component: BoardsComponent,
    canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "task-edit",
    component: TaskViewComponent,
    canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "admin-console",
    component: AdminConsoleComponent,
    canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AuthGuard], data: {authGuardPipe: redirectLoggedInToHome}
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'overview',
    component: TaskOverviewComponent,
  },
  {
    path: '',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
