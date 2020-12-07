import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StatusValue } from './models/models';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private modalService: NgbModal) {

  }

  public modalOpen() {
    const modalRef = this.modalService.open(UserFormComponent);
  }
  
}
