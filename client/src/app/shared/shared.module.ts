import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageComponent } from './mini-components/language/language.component';


//Services
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,  
    NotFound404Component, 
    LanguageComponent, 
 
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,   
    NotFound404Component,

  ],
  imports: [  
    CommonModule,
    TranslateModule
  ],
  providers: [
    RouterModule,
    CommonModule,
    BrowserModule,
  ],
})
export class SharedModule { }