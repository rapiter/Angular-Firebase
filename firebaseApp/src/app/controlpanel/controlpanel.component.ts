import { Component, OnInit } from '@angular/core';
import {User} from "../shared/user.model";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";

@Component({
  selector: 'app-controlpanel',
  templateUrl: './controlpanel.component.html',
  styleUrls: ['./controlpanel.component.scss']
})
export class ControlpanelComponent implements OnInit {
  users: Observable<User[]>;

  constructor(private angFireAuth: AngularFireAuth,
              private angFirestore: AngularFirestore) {

    this.users = this.angFirestore
      .collection<User>('users', ref => ref.orderBy('displayName','asc')).valueChanges();
  }

  ngOnInit() {

  }

  async deleteUser(uid: string){
    this.angFirestore.collection("users").doc(uid).delete().then(function() {
      this.angFireAuth.auth.currentUser.delete();
      console.log("User successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing user: ", error);
    });
  }

  updateUser(uid: string, displayName: string){
    this.angFirestore.collection("users").doc(uid).update({


    })
  }


}
