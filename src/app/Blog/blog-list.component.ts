import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {
  blogs :any;
  //this.proceedlogin();
  constructor(private router: Router,private service: AuthService) {
   // sessionStorage.clear();

  }
  ngOnInit() {
    this.service.GetBloglist().subscribe(item => {
      this.blogs = item;});
      console.log("blog Details",this.blogs);
    };   
  
  
    
  }
