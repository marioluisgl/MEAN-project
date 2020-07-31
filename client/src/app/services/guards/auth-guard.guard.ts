import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HandleAuthService } from './../handle-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(  private _handleAuth: HandleAuthService,
                private _router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      const isLoggedIn = this._handleAuth.isLoggedIn;

      if(isLoggedIn){
        return true;
      }
      this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
  }
}
