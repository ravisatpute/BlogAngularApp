import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute, Router} from '@angular/router';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  constructor(private service:AuthService, private toaster:ToasterService ,  private route: ActivatedRoute,private router:Router ) {}
  @Input() pblogId: any;
  description:any;
  @Output("parentFun") parentFun: EventEmitter<any> = new EventEmitter();
  commentData: any = {
    blogId:0,
    CommentId:0,
    userId:0,
    description:'',
  };
 
  ngOnInit() { }
  addComment()
  {

   if( this.commentData.description){

    this.route.paramMap.subscribe((params) => {

     var selectedBlogId= this.route.snapshot.params['blogId'];
     selectedBlogId++;
        this.commentData.blogId= selectedBlogId;
          this.commentData.userId= sessionStorage['userId'];
          this.service.addComment(this.commentData).subscribe(item => {
          selectedBlogId=selectedBlogId-1;
          this.commentData.description='';
        
            this.toaster.success('Comment Add on Blog!', 'Comment');
        
          this.parentFun.emit();
           console.log("This is a success message",item);
          });
        });
   }
  }
}