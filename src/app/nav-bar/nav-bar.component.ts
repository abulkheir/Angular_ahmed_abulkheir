import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private userService: UserManagementService) { }
  islogedin: boolean = true
  ngOnInit() {
    this.logedINN()
  }

  isLogedIn: boolean = false
  logedINN() {

    this.userService.userLayoutHeader.subscribe((res) => {
      this.isLogedIn = res;
    });

    return false

  }
}
