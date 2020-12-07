import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { Alert, headers, User } from '../models/models';
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
  public savedUsers: User[] = [];
  public headers = headers;
  public alert!: Alert;
  constructor(private modalService: NgbModal) {
    let users = localStorage.getItem('users');
    if (!users) {
      this.savedUsers = [];
    }
    else {
      this.savedUsers = JSON.parse(users);
    }
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
      this._alert.next({
        type: 'success',
        message: res.message
      })
    })
  }

  public deleteUser(i: number) {
    this.savedUsers.splice(i, 1);
    localStorage.setItem('users', JSON.stringify(this.savedUsers));
    this._alert.next({
      type: 'success',
      message: 'Пользователь удален'
    })
  }
}
