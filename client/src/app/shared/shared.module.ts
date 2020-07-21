import { NgModule } from '@angular/core';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NotFound404Component } from './not-found404/not-found404.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,  
    NotFound404Component   
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,   
    NotFound404Component 
  ],
  providers: [],
})
export class SharedModule { }