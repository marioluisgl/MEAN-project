import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HandleAuthService } from '../../services/handle.services.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _handleAuthService: HandleAuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this._handleAuthService.dataLogged.token;
        const isLoggedIn = this._handleAuthService.isLoggedIn;
        const hostApi = request.url.startsWith(environment.hostApi);
  
        if (isLoggedIn && hostApi) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}
