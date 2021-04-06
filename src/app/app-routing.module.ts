import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AssistantComponent } from './assistant/assistant.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { SolvedComponent } from './solved/solved.component';

const routes: Routes = [
  { path: '', component: QuestionComponent },
  { path: 'solved', component: SolvedComponent },
  { path: 'assistant', component: AssistantComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
