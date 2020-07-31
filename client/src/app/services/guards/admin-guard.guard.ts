import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HandleAuthService } from './../handle.services.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  constructor(  private _handleAuth: HandleAuthService,
                private _router: Router) {}  
    
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userData = this._handleAuth.dataLogged.user;   
    const isLoggedIn = this._handleAuth.isLoggedIn;

    if( isLoggedIn && userData.role === 'ROLE_ADMIN' ){
      return true;

    }else{
      this._router.navigate(['/'], {queryParams: {returnUrl: state.url}});
      return false;
    }     
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(next, state);
  }

}
