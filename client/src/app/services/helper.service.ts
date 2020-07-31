import {forEach, random, round} from 'lodash';


export class Helper {

    static appendDataToForm(data: { [key in string]: any }, photos?: File[] | any, video?: File, files?: { name: string, file: any }[]): FormData {
        const formData = new FormData();
    
        const dataKeys = Object.keys(data);
        dataKeys?.forEach(item => {
          formData.append(item, data[item]);
        });
    
        if (photos && photos instanceof Array && photos.length > 0) {
          const photosKey = Object.keys(photos).map((key) => {
            return (typeof (photos[key]) === 'object') ? photos[key] : null;
          });
          photosKey.forEach((item, key) => {
            formData.append('photo-' + key, item);
          });
        } else if (photos && photos.name) {
          formData.append('photo', photos);
        }
    
        if (video instanceof File && video.name) {
          formData.append('video', video);
        }
    
        files?.forEach(data => {
          if (data.file instanceof File && data?.name) {
            formData.append(data?.name, data.file);
          }
        });
        return formData;
    }

    static convertToStringify(obj: any): any {
        delete obj.__v;
        for (const key in obj) {
          if (obj[key] instanceof Object) {
            obj[key] = JSON.stringify(obj[key]);
          }
        }
        return obj;
    }

    static removeNulls(obj: any): any {
        let index = 0;
        let deleted = 0;
        delete obj.__v;
        for (const key in obj) {
          index++;
          if (obj[key] === null || obj[key] === undefined || obj[key] instanceof Function || (obj[key] instanceof Array && obj[key].length === 0)) {
            delete obj[key];
            deleted++;
          } else if (obj[key] instanceof Object && !(obj[key] instanceof Array) && !(obj[key] instanceof Date)) {
            const result = this.removeNulls(obj[key]);
            result === null ? delete obj[key] : obj[key] = result;
          }
        }
    
        if (index === deleted) {
          return null;
        }
        return obj;
    }
    

}