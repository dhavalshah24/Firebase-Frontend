import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signupURL = "http://localhost:8080/api/signupEmailPassowrd";
  signup(data: any) {
    return this.http.post<any>(this.signupURL, data);
  }
}
