import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';

export interface UserModule {
  name: string,
  id: string
}
export interface UserData {
  firstName: string,
  id: string,
  lastName: string,
  userName: string,
  phoneNumber: string,
  email: string,
  password: string,
  department: string
}
@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) {

  }
  dataArr: UserData[] = []
  userManagementUrl = './assets/Departments/fake-db.json'
  getAllUsers(): Observable<UserModule[]> {
    return this.http.get<UserModule[]>(this.userManagementUrl)
  }

  addUser(obj: UserData[]) {
    localStorage.removeItem('userData')
    localStorage.setItem("userData", JSON.stringify(obj));
  }
  userLayoutHeader = new EventEmitter<boolean>();


}
