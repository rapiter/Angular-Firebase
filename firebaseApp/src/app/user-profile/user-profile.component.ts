import { Component, OnInit } from '@angular/core';
import {AuthService} from "../authentication/shared/services/auth/auth.service";
import {Observable} from "rxjs";
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
