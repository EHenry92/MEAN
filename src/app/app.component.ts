import { Component } from '@angular/core';

//Import the DataService
import {DataService} from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'app';
  //Define a users property ot hold user data
  users: Array<any>;
  newUser: string;

  //Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService) {
    //Access the Data Service's getUsers method
    this._dataService.getUsers()
      .subscribe(res => this.users = res);
  }

  addUser():void {
     this._dataService.postUser({"name": this.newUser})
    .subscribe(
      data => { console.log(data); },
      err => { console.log("An error occured positing user", err); }
    )
    this.newUser = '';
    this._dataService.getUsers()
      .subscribe(res => this.users = res);

  }
  subUser(userId):void {
    this._dataService.destroyUser(userId)
    .subscribe(
      data => { console.log(data); },
      err => { console.log("An error occured positing user", err); }
    )
    this._dataService.getUsers()
      .subscribe(res => this.users = res);
  }

  editUser(userId, newName): void {

  };
}




    // this._dataService.putUser("5b06d5196fb05f0420bb5266", {name: "Bobby Joel AppleSeed"})
    // .subscribe(
    //   data => {
    //     // console.log(data);
    //   },
    //   err => {
    //     console.log("An error occured updating user", err);
    //   }
    // )
    // this._dataService.destroyUser("5b06d74e57b2fd0468c0479e")
    // .subscribe(
    //   data => { console.log(data); },
    //   err => { console.log("An error occured deleting user", err); }
    // )
