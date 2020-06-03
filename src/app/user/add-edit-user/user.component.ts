import { Component, OnInit } from '@angular/core';
import { UserManagementService, UserModule, UserData } from 'src/app/services/user-management.service';
import { NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserManagementService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute

  ) { }
  obj: any = [];
  editMode: boolean = false;
  entireData;
  dataIndex;
  ngForm: FormGroup;
  emailPattern: string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
  passwordPattern: string = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  phoneNumberPattern = "^(0{1}1{1}0{1})|(0{1}1{1}1{1})|(0{1}1{1}2{1})|(0{1}1{1}5{1})[0-9]{1,10}"
  departments: UserModule[];
  viewIsReady: boolean = false
  ngOnInit() {
    this.userService.userLayoutHeader.emit(true)
    if (this.router.url.includes('edit-user')) {
      this.getUserData()
    }
    this.getDepartmentList();
    this.ngForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern), Validators.minLength(8)]],
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(this.phoneNumberPattern), Validators.minLength(10)]],
      department: ['', [Validators.required]]
    })
  }
  getDepartmentList() {
    this.userService.getAllUsers().subscribe((res: any) => {
      console.log(res)
      this.departments = res.departments;
      this.viewIsReady = true
    })
  }
  getUserData() {
    let dashboardId;
    this.editMode = true
    this.route.params.subscribe(params => {

      dashboardId = params['id']
    });
    this.entireData = JSON.parse(localStorage.getItem('userData'))
    for (let i = 0; i < this.entireData.length; i++) {
      if (this.entireData[i].id == dashboardId)
        this.obj = this.entireData[i];
      this.dataIndex = i
    }



  }
  updateUser(form: NgForm) {
    console.log('dataIndex1', this.entireData)

    this.entireData.splice(this.dataIndex, 1);
    console.log('dataIndex2', this.entireData)
    this.entireData.push(this.obj)
    this.userService.addUser(this.entireData);
    this.router.navigate(['/'])

  }
  creatUser(form: NgForm) {
    let Arr = [];
    let lastId = undefined
    if (!form.valid) {
      this.ngForm.markAllAsTouched()
      return
    }
    if (this.editMode) {
      this.updateUser(form);
      return
    }
    if (localStorage.getItem('userData')) {
      this.entireData = JSON.parse(localStorage.getItem('userData'))
      let ids = JSON.parse(localStorage.getItem('userData'))

      for (let i = 0; i < ids.length; i++) {
        Arr.push(ids[i].id)
      }
      lastId = Arr[Arr.sort().length - 1];
      lastId += 1
    } else {
      this.entireData = []
      lastId = 1
    }

    this.obj = form.value
    this.obj.id = lastId
    this.entireData.push(this.obj)
    console.log(form.value)
    this.userService.addUser(this.entireData);
    this.router.navigate(['/'])

  }
}
