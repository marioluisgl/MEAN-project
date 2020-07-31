import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { IUserModel, IAuthUser, IAuthSuccessUser } from '../models/user.model';
import { IApiPaginatorData, IPaginator, IResponseApi } from '../models/util.model';
import { Helper } from './helper.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HandleAuthService {

  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient,
              private _router: Router) {
  }


  // Register User from Web
  public register_user(options: {data: IUserModel}): Observable<IUserModel> {
    const formData = Helper.appendDataToForm(options.data);
    console.log(formData);
    return this._http.post<IResponseApi>(`${environment.hostApi}/api/user/save`, formData).pipe(map(response => {
      console.log(response);
      if (response?.success) {
        return response.data;
      } else {
        throw response.message || 'error';
      }
    }));
  }

  // Login User
  public auth_user(data: IAuthUser): Observable<IUserModel> {
    return this._http.post<IResponseApi & { data: IAuthSuccessUser }>(`${environment.hostApi}/api/user/login`, data).pipe(map(response => {
      if (response?.success) {
        console.log(response.data);
        return this.store_auth_data(response.data);
      } else {
        this._clearDataStorage();
        throw  response.errors || 'error';
      }
    }));
  }

  public logout_user() {
    this._clearDataStorage();
    this._router.navigate(['/login']);
  }

  // Store user dara and token
  public store_auth_data(data: { user: IUserModel, token: string }): IUserModel {
    const localToken = data.token;
    const userData = data.user;
    this.save_token_in_local_storage(localToken);
    this.save_user_in_local_storage(userData);
    return {
      ...userData,
    };
  }

  // Persist token in local storage
  private save_token_in_local_storage(value: string) {
    localStorage.setItem('token', value);
  }

  // Persist user data in local sotrage
  private save_user_in_local_storage(data: IUserModel) {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  public get get_token_from_storage(): any {
    return localStorage.getItem('token');
  }

  public get get_user_data_from_storage(): string {
    return localStorage.getItem('userData');
  }

  public get dataLogged(): { user: IUserModel, token: string } {
    const userData = JSON.parse(this.get_user_data_from_storage);
    const token = this.get_token_from_storage;
    return {user: userData, token};
  }

  public get isLoggedIn(): boolean {
    const userData = this.get_user_data_from_storage;
    const token = this.get_token_from_storage;
    if( userData && token ){
      return true;
    }
    return false;
  }

  private _clearDataStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  }


}
