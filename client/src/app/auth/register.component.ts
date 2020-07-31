import { Component, OnInit, Input } from '@angular/core';
import { 
  FormGroup, 
  FormBuilder, 
  Validators, 
  ValidatorFn, 
  AbstractControl 
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IUserModel, UserModel } from '../models/user.model';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { HandleAuthService } from '../services/handle-auth.service';
import { cloneDeep } from 'lodash';
import { Helper } from '../services/helper.service';
import { Router, ActivatedRoute } from '@angular/router';
const swal: SweetAlert = _swal as any;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.scss']
})
export class RegisterComponent implements OnInit {
  
  public userRegisterForm: FormGroup;
  @Input() modelData: IUserModel;
  
  constructor(private _translate: TranslateService,
              private _handleAuth: HandleAuthService,
              private _router: Router,
              private _route: ActivatedRoute,
              protected _fb: FormBuilder) { 

    this.createRegisterForm();
  }



  ngOnInit(): void {
    
  }

  public createRegisterForm(){
    this.modelData = new UserModel();
    this._registerFormGroup();
  }

  public registerUser(){
   
    if(!this.userRegisterForm.value.conditions){
      swal(
        this._translate.instant('Alert.important'), 
        this._translate.instant('Alert.conditions'), 
        'warning'
      );
      return;
    }

    this.modelData.name = this.userRegisterForm.get('name').value;
    this.modelData.username = this.userRegisterForm.get('username').value;
    this.modelData.email = this.userRegisterForm.get('email').value;
    this.modelData.password = this.userRegisterForm.get('password').value;
   
    let modelDataCopy = cloneDeep(this.modelData);
    modelDataCopy = Helper.convertToStringify(Helper.removeNulls(modelDataCopy));
    console.log(modelDataCopy);
    this._handleAuth.register_user({data: modelDataCopy}).subscribe(data => {
      this.modelData = new UserModel();
      console.log(data);
    });
  }

  private _registerFormGroup(){
    this.userRegisterForm = this._fb.group({
      name: [this.modelData.name, Validators.required],
      username: [this.modelData.username, Validators.required],
      email: [this.modelData.email, [Validators.required, Validators.email]],
      password: [this.modelData.password, [Validators.required, Validators.min(3)]],
      password2: [this.modelData.password2, [Validators.required, Validators.min(3), this._matchValidator('password')]],
      conditions: [false, []],
    });
  }

  // Comparar password - validator customizado
  protected _matchValidator(controlName: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.root['controls'] !== undefined) {
        if (control.root['controls'][controlName].value === control.value) {
          return null;
        } else {
          return {
            matchPassword: {
              value: control.value,
            }
          };
        }
      }
      return null;
    };
  }

}
