import { RegisterComponent } from './auth/register.component';
import { PagesComponent } from './pages/pages.component';
import { NotFound404Component } from './shared/not-found404/not-found404.component';
import { GraficsComponent } from './pages/grafics/grafics.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { LoginComponent } from './auth/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { 
    path: '', 
    component: PagesComponent ,
    children: [
      { path: 'dashboard', component: DashboardComponent }, 
      { path: 'progress', component: ProgressComponent },
      { path: 'grafics', component: GraficsComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },
 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: '**', component: NotFound404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
