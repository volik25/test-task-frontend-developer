import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StatusValue, User } from '../models/models';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.less']
})
export class UserFormComponent implements OnInit {
  @Input() user: User | null = null;
  public userForm!: FormGroup;
  public statuses = StatusValue;
  public duplicated: boolean = false;
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
    
  }

  ngOnInit(): void {
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
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
    this.userForm.get('email')?.valueChanges.subscribe(value => {
      for (let i = 0; i < this.users.length; i++) {
        const user = this.users[i];
        if ((user.email.indexOf(value) +1) && user.email != this.user?.email) {
          this.duplicated = true;
          break;
        }
        else{
          this.duplicated = false;
        }
      }
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
    if (this.duplicated) {
      this.userForm.get('email')?.markAsDirty();
      return;
    }
    let result = '';
    if (this.user) {
      user["lastChangeDate"] = new Date(Date.now()).toLocaleString();
      let i = this.users.findIndex(x => x.email === this.user?.email);
      let createDate = this.users[i].createDate;
      user["createDate"] = createDate;
      this.users[i] = user;
      result = 'Пользователь обновлен';
    }
    else{
      user["createDate"] = new Date(Date.now()).toLocaleString();
      user["lastChangeDate"] = new Date(Date.now()).toLocaleString();
      this.users.push(user);
      result = 'Пользователь добавлен';
    }
    localStorage.setItem('users', JSON.stringify(this.users));
    this.activeModal.close({
      message: result,
      data: this.users});
  }

  
  public get f() {
    return this.userForm.controls;
  }

}
