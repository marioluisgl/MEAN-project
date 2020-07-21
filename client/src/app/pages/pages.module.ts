import { NgModule } from '@angular/core';

//Modules
import { SharedModule } from './../shared/shared.module';

//Routes
import { PagesRoutingModule } from './pages.routing.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficsComponent } from './grafics/grafics.component';
import { ProgressComponent } from './progress/progress.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    GraficsComponent

  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraficsComponent
  ],
  providers: [],
  imports: [
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }