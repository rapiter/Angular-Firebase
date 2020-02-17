import { Injectable } from '@angular/core';
import {User} from "../shared/user.model";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {auth} from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(private angFireAuth: AngularFireAuth,
              private angFirestore: AngularFirestore,
              private router: Router) {

    this.user$ = this.angFireAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.angFirestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      }))
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.angFireAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user).then((result) => this.router.navigate(['profile']));
  }

  async normalSignin(email, password){
    return this.angFireAuth.auth.signInWithEmailAndPassword(email,password).then((result)=> {
      this.updateUserData(result.user);
      this.router.navigate(['profile']);
    });
  }

  async normalRegister(email, password, displayName){
    return this.angFireAuth.auth.createUserWithEmailAndPassword(email,password)
      .then((result)=> {
      result.user.updateProfile({
        displayName: displayName,
          photoURL: ''
      })
        .then(() => {
        this.updateUserData(result.user);
        this.router.navigate(['profile']);
      });
    });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.angFirestore.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true })
  }

  async signOut() {
    await this.angFireAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}
