import {Injectable} from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";


@Injectable()
export class DataService {
  result: any;
  constructor(private _http: Http) {}
  getUsers() {
    return this._http.get('/api/users')
      .pipe(map(result => this.result = result.json().data))
      // .pipe(map((res: any) => {
      //   console.log('res', res);
      //   return res;
      // }))
      // .map(result => this.result = result.json().data);
  }
}
