import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  HandleSharedService,
  HandleSidebarService,
 } from '../services/handle.services.service';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    HandleSharedService,
    HandleSidebarService
  ],
  declarations: []
})
export class ServiceModule { }