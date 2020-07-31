import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  HandleSharedService,
  HandleSidebarService,
  HandleAuthService,
  AuthGuardGuard,
  AdminGuardGuard
 } from '../services/handle.services.service';




@NgModule({
  imports: [
CommonModule,
    HttpClientModule
  ],
  providers: [
    HandleSharedService,
    HandleSidebarService,
    HandleAuthService,
    AdminGuardGuard,
    AuthGuardGuard
  ],
  declarations: []
})
export class ServiceModule { }