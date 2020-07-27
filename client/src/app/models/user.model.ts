import {merge} from 'lodash';

export interface IUserModel {
    _id?: string;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    password2?: string;
    role?: IRole | any;    
    //photo?: File | any;  
}
  
export class UserModel implements IUserModel {
    name: string;
    username: string;
    email: string;
    password: string;
    password2: string;
    role?: IRole | any;  
    //photo?: File | any;  

    constructor(options?: IUserModel) {
        merge(this, this._getDefaults(), options);
    }

    private _getDefaults(): IUserModel {
        return {
            name: null,
            username: null,
            email: null,
            password: null,
            password2: null,
            role: 'ROLE_USER',
        };
    }
}
  
  
export enum IRole {
    ROLE_USER = 'ROLE_USER', 
    ROLE_PREMIUM = 'ROLE_PREMIUM', 
    ROLE_ADMIN = 'ROLE_ADMIN'
}