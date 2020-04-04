import { Component, OnInit } from '@angular/core';
import {AuthService} from "../authentication/shared/services/auth/auth.service";
@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }


  openDialog(): void {
  }
}
