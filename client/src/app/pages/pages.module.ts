import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Modules
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

//Routes
import { PagesRoutingModule } from './pages.routing.module';

//Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficsComponent } from './grafics/grafics.component';
import { ProgressComponent } from './progress/progress.component';





@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    GraficsComponent,

  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraficsComponent,

  ],
  providers: [],

  imports: [
    SharedModule,
    PagesRoutingModule,
    CommonModule,
    BrowserModule,
    TranslateModule
  ]
})
export class PagesModule { }