import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private http: HttpClient) { }

  getAllBlogsURL = "http://localhost:8080/api/getAllBlogs";
  getAllBlogs() {
    return this.http.get<any>(this.getAllBlogsURL);
  }

  writeBlogURL = "http://localhost:8080/api/write";
  writeBlog(blogData: any) {
    return this.http.post<any>(this.writeBlogURL, blogData);
  }

  getMyBlogsURL = "http://localhost:8080/api/getMyBlogs";
  getMyBlogs() {
    return this.http.get<any>(this.getMyBlogsURL);
  } 

}
