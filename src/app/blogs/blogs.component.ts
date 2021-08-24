import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogsService } from '../services/blogs/blogs.service';
import { Router } from "@angular/router"
import { LoginService } from '../services/login/login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  images: any;
  content = ""
  allBlogs: any[] = [];
  myBlogs: any[] = [];
  allBlogsDiv: boolean = true;
  myBlogsDiv: boolean = false;
  user_uid = "";

  constructor(private blogsService: BlogsService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {

    const user = firebase.auth().currentUser;
    if (user) {
      this.user_uid = user.uid;
      console.log(this.user_uid);
      
    } else {
      // res.status(400).send({message: "Please login"});
      console.log("error");

    }


    this.blogsService.getAllBlogs().subscribe(
      response => {
        this.allBlogs = response;
        // console.log(this.allBlogs);
      },
      error => {
        this.router.navigate(['/login']);
      }

    );

  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      // console.log(this.images);
    }
  }

  onSubmit() {

    let formData = new FormData();
    formData.append("content", this.content);
    formData.append("image", this.images);
    formData.append("user_id", this.user_uid);

    this.blogsService.writeBlog(formData).subscribe(
      response => console.log("Submitted", response),
      error => console.log("error", error)

    );
    setTimeout(() => {
      window.location.reload();
    }, 2000);

  }

  logout() {
    this.loginService.logout().subscribe(
      res => {
        this.router.navigate(['/login']);
      },
      error => console.log(error)
    );
  }

  getMyBlogs() {

    this.blogsService.getMyBlogs().subscribe(
      response => {
        this.myBlogs = response;
      },
      error => {
        this.router.navigate(['/login'])
      }
    );
    this.myBlogsDiv = true;
    this.allBlogsDiv = false;

  }

  getAllBlogs() {
    this.myBlogsDiv = false;
    this.allBlogsDiv = true;
  }

}
