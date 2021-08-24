import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { Router } from "@angular/router"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  loginForm = this.fb.group({
    email: null,
    password: null,
  })

  loginWithGoogle() {
    this.loginService.loginWithGoogle().then(
      () => this.router.navigate(['/blogs'])
    );
  }

  loginWithEmail() {
    this.loginService.loginWithEmail(this.loginForm.value).subscribe(
      res => {
        this.router.navigate(['/blogs']);
      },
      error => {
        alert(error.error);
      }
    );
  }

}
