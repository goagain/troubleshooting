import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AssistantComponent } from './assistant/assistant.component';
import { QuestionComponent } from './question/question.component';
import { SolvedComponent } from './solved/solved.component';

const routes: Routes = [
  { path: '', component: QuestionComponent },
  { path: 'solved', component:SolvedComponent},
  { path: 'assistant', component:AssistantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
