import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { Alert, headers, StatusValue, User } from '../models/models';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.less']
})
export class UsersTableComponent implements OnInit {
  @ViewChild('alertDiv') alertDiv!: NgbAlert;
  private _alert = new Subject<Alert>();
  public alertMessage: string = '';
  public statusControl: FormControl = new FormControl('allUsers');
  public searchControl: FormControl = new FormControl();
  public statuses = StatusValue;
  public savedUsers: User[] = [];
  public showedUsers: User[] = [];
  public headers = headers;
  public alert!: Alert;
  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    let getUsers = localStorage.getItem('users');
    if (!getUsers) {
      this.savedUsers = [];
    }
    else {
      this.savedUsers = JSON.parse(getUsers);
      this.showedUsers = this.savedUsers;
    }
    this.statusControl.valueChanges.subscribe(value => {
      if (value === 'allUsers') {
        this.showedUsers = this.savedUsers;
      }
      else{
        this.showedUsers = this.savedUsers.filter(x => x.status === value);
      }
    });
    this.searchControl.valueChanges.subscribe(value => {
      if (value === '') {
        this.showedUsers = this.savedUsers;
      }
      else {
        this.showedUsers = this.findString(value);
      }
    })
  }

  ngOnInit(): void {
    this._alert.subscribe(alert => this.alert = alert);
    this._alert.pipe(debounceTime(3000)).subscribe(() => {
      if (this.alertDiv) {
        this.alertDiv.close();
      }
    });
  }

  public modalOpen(user?: User) {
    const modal = this.modalService.open(UserFormComponent, { centered: true });
    modal.componentInstance.user = user;
    modal.result.then(res => {
      console.log(res);
      this.savedUsers = res.data;
      this.showedUsers = res.data;
      this._alert.next({
        type: 'success',
        message: res.message
      })
    })
  }

  public deleteUser(i: number) {
    this.savedUsers.splice(i, 1);
    localStorage.setItem('users', JSON.stringify(this.savedUsers));
    this.showedUsers = this.savedUsers;
    this._alert.next({
      type: 'success',
      message: 'Пользователь удален'
    })
  }

  private findString (result: string) {
    let arrayResult: User[] = [];
    this.savedUsers.forEach(user => {
      if ((user.email.indexOf(result) + 1) || (user.phone.indexOf(result) +1 )) {
        arrayResult.push(user);
      }
    })
    return arrayResult;
  };
}
