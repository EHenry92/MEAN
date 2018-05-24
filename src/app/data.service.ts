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
  }
  postUser(data) {
    return this._http.post('/api/users', data)
  }
  putUser(uId, data) {
    return this._http.put(`/api/users/${uId}`, data)
  }
  destroyUser(uId) {
    return this._http.delete((`/api/users/${uId}`))
  }
}
