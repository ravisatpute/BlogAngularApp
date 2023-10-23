import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { blog } from '../model/blog';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 


  }
  headers:any;
  requestOptions:any;
  ngOnInit(){
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ sessionStorage["token"]}`
    });
    
    this.requestOptions = { headers: this.headers};
  }
  apiurl='https://localhost:7267/api/';
  LogUser(inputdata:any){
    return this.http.post(this.apiurl+'User/UserLogin',inputdata)
  }
  addUser(userData:any){
    return this.http.post(this.apiurl+'User/AddUser',userData,this.requestOptions);
  }
  addComment(userData:any){
    return this.http.post(this.apiurl+'Commnet/AddComment',userData,this.requestOptions);
  }

  deleteComment(id:any){
    return this.http.delete(this.apiurl+'Commnet?id='+id,this.requestOptions);
  }
  GetBloglist(){
    return this.http.get(this.apiurl+'Blog/GetBlog',this.requestOptions);
  }

  getBlogContent(id:any){
    
    return this.http.get(this.apiurl+'Blog/GetBlogById/?id='+id);
  }
  getBlogById(id:any){
    
    return this.http.get<blog>(this.apiurl+'Blog/GetBlogById/?id='+id);
  }

  getBlogCommentsById(id:any){
    return this.http.get(this.apiurl+'Commnet/GetCommentById?id='+id);
  }
  addBlog(userData:any){
    return this.http.post(this.apiurl+'Blog/AddBlog',userData,this.requestOptions);
  }

  updateBlog(inputdata:any){
    return this.http.put(this.apiurl+'Blog',inputdata);
  }
  updateComment(inputdata:any){
    return this.http.put(this.apiurl+'Commnet',inputdata);
  }
  deleteBlog(id:any){
    return this.http.delete<blog>(this.apiurl+'Blog?id='+id);
  }

  getuserrole(){
    return this.http.get('http://localhost:3000/role');
  }
  isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
}
