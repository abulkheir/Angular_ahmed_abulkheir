import { Component, OnInit } from '@angular/core';
import { NgForm, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { UserManagementService } from '../services/user-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private toastr: ToastrService,
    public translate: TranslateService,
    private router: Router,
    private userService: UserManagementService) { }

  ngOnInit() {
    this.userService.userLayoutHeader.emit(false)
  }
  logIn(form: NgForm) {
    if (!form.valid) {
      this.toastr.error(this.translate.instant('login error message'), this.translate.instant('Error Card'));

      return
    }
    this.router.navigate(['/'])
  }
}
