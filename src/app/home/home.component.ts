import { Component, OnInit } from '@angular/core';
import { UserManagementService, UserData } from '../services/user-management.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserManagementService) { }

  ngOnInit() {
    this.getAllUsers()
  }
  entireData: UserData[] = [];
  noData: boolean = true
  getAllUsers() {
    this.userService.userLayoutHeader.emit(true)
    if (localStorage.getItem('userData')) {
      this.entireData = JSON.parse(localStorage.getItem('userData'));
      this.noData = false
    }
    return
  }
  deleteUser(id) {
    let dataIndex;
    console.log('dataIndex1', this.entireData);
    for (let i = 0; i < this.entireData.length; i++) {
      if (this.entireData[i].id == id)

        dataIndex = i
    }

    this.entireData.splice(dataIndex, 1);
    console.log('dataIndex2', this.entireData)

    this.userService.addUser(this.entireData)
  }
}
