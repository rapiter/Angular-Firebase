import { Component, OnInit } from '@angular/core';
import {AuthService} from "../authentication/shared/services/auth/auth.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  constructor(authService: AuthService) { }

  ngOnInit() {
  }

}
