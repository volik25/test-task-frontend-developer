import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StatusValue, User } from '../models/models';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.less']
})
export class UserFormComponent implements OnInit {
  public userForm!: FormGroup;
  public statuses = StatusValue;
  private users: User[] = [];
  private phonePattern: string = '^((8|\\+7)[\- ]?)?(\\(?\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$';
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
    this._initForm();
    let users = localStorage.getItem('users');
    if (!users) {
      this.users = [];
    }
    else {
      this.users = JSON.parse(users);
    }
    console.log(this.users);
    
  }

  ngOnInit(): void {
  }

  private _initForm(){
    this.userForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      phone: [null, [Validators.required, Validators.pattern(this.phonePattern)]],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      middleName: [null],
      status: [null, Validators.required]
    })
  }

  public saveUser() {
    if (this.userForm.invalid) {
      for (const param in this.userForm.controls) {
        const control = this.userForm.controls[param];
        if (control.invalid) {
          control.markAsDirty();
        }
        else {
          control.markAsUntouched();
        }
      }
      return;
    }
    let user = this.userForm.getRawValue();
    for (let i = 0; i < this.users.length; i++) {
      const saveUser = this.users[i];
      if (user.email == saveUser.email) {
        return;
      }
    }
    user["createDate"] = new Date(Date.now()).toLocaleString();
    user["lastChangeDate"] = new Date(Date.now()).toLocaleString();
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    this.activeModal.close('Пользователь добавлен');
  }

  
  public get f() {
    return this.userForm.controls;
  }

}
