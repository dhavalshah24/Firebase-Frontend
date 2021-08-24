import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: any;  
  constructor(private http: HttpClient, private fireAuth: AngularFireAuth, private db: AngularFirestore) { 
    this.fireAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  async loginWithGoogle() {
    try {
      const result = await this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      // console.log(result);
      
      this.db.collection("users").doc(result?.user?.uid).set({
        username: result?.user?.displayName,
        email: result?.user?.email,
        userid: result?.user?.uid
      });
      console.log("login successful");
    } catch (error) {
      console.log(error);
    }
  }

  loginWithEmailURL = "http://localhost:8080/api/loginEmailPassword";
  loginWithEmail(data: any) {
    return this.http.post<any>(this.loginWithEmailURL, data);
  }

  logoutURL = "http://localhost:8080/api/logout";
  logout() {
    return this.http.get<any>(this.logoutURL);
  }

}
