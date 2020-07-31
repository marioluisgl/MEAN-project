import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { HandleAuthService } from '../services/handle.services.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { IUserModel } from '../models/user.model';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginUserForm: FormGroup;


  constructor(private _translate: TranslateService,
              private _handleAuth: HandleAuthService,
              private _router: Router,
              private _route: ActivatedRoute,
              protected _fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
   
  }

  public createForm() {
    this.loginUserForm = this._fb.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(3)]],
      rememberme: [false, Validators.required]
    });
  }


  public loginUser(){
    if(!this.loginUserForm.valid){
      
      swal(
        this._translate.instant('Alert.important'), 
        this._translate.instant('Errors.passwordLength'), 
        'warning'
      );
      return;
    }

    const data: IUserModel = {
      username: this.loginUserForm.get('username').value,
      password: this.loginUserForm.get('password').value
    };
  
    this._handleAuth.auth_user(data).subscribe(data =>{  
      this._router.navigate(['/dashboard']);
    });
  }
}
