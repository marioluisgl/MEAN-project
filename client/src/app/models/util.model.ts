import {merge} from 'lodash';


export interface IPaginator {
    start: number;
    end: number;
}

export class Paginator implements IPaginator {
    start: number;
    end: number;
  
    constructor(options?: IPaginator) {
      merge(this, this._getDefaults(), options);
    }
  
    private _getDefaults(): IPaginator {
      return {
        start: 0,
        end: 50
      };
    }
}

export interface IApiPaginatorData {
    docs: any[];
    totalDocs?: number;
    options?: any;
  
    [key: string]: any;
}
  
  export interface IResponseApi {
    success?: boolean;
    errors?: {
      code?: number,
      message?: string,
    };
    data?: IApiPaginatorData | any;
    message?: string;
}