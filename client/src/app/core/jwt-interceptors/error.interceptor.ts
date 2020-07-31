import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleAuthService } from './../../services/handle.services.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private _handleAuthService: HandleAuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this._handleAuthService.logout_user();
                location.reload(true);
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
