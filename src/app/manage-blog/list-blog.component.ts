import { Component, OnInit } from '@angular/core';
import { filter, first } from 'rxjs/operators';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr'
@Component(
  {
    templateUrl: "./list-blog.component.html"
  })
export class ListComponent implements OnInit {
    users :any;

    constructor(private service: AuthService,private route: ActivatedRoute, 
      private router: Router, private toast:ToastrService) {}

    ngOnInit() {
       let selectId:number=sessionStorage ['userId'];
       
        this.service.GetBloglist()
            .pipe(first())
            .subscribe(item => {
              this.users = item;
              this.users=this.users.filter((x:any) => x.userId== selectId);
            });
    }

    deleteUser(user: any) {
      this.toast.success("Bolg Deleted successfully","Blog");
       
        this.service.deleteBlog(user.blogId)
            .pipe(first())
            .subscribe((item) => {
            this.users=this.users.filter((x:any) => x.blogId!== user.blogId);
            });
    }
}