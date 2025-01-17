import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberComponent } from './member/member.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticlesComponent } from './articles/articles.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { OutilsComponent } from './outils/outils.component';

const routes: Routes = [

  {
    path: 'create',
    pathMatch : "full",
    component: MemberFormComponent
  },
  
  {
    path: 'dashboard',
    pathMatch : "full",
    component: DashboardComponent
  },
  {
    path: 'outils',
    pathMatch : "full",
    component: OutilsComponent
  },
  {
    path: 'articles',
    pathMatch : "full",
    component: ArticlesComponent
  },
  {
    path: 'events',
    pathMatch : "full",
    component: EventsComponent
  },
  {
    path: ':id/edit',
    pathMatch : "full",
    component: MemberFormComponent
  },
  {
    path: 'member',
    pathMatch:"full",
    component: MemberComponent
  }
  ,{
    path: 'login',
    pathMatch:"full",
    component: LoginComponent
  }
  ,{
    path: '',
    component: LoginComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
