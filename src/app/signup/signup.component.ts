import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupService } from '../services/signup/signup.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private signupService: SignupService, private router: Router) { }

  ngOnInit(): void {
  }

  signupForm = this.fb.group({
    username: null,
    email: null,
    password: null,
  })

  signup() {
    
    this.signupService.signup(this.signupForm.value).subscribe(
      res => this.router.navigate(['/blogs']),
      error => alert(error.error)
    );
  }
}
