import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{CommentComponent} from '../Blog/comment.compoent';
import { ModalComponent } from '../modal/modal.component';
import { AuthService } from '../Services/auth.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-content',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.css'],
  
})
export class ContentComponent implements OnInit {
  @ViewChild('child') child:CommentComponent;

  constructor(
    private route: ActivatedRoute,
    private toaster: ToasterService,
    private service:AuthService,

  ) {}
  userId:any;
  
  @ViewChild('modal', {static: false}) modal: ModalComponent
 ngAfterViewInit() {
  // child is set
  this.child.addComment();
}
  ids?:string;
  blog:any;
  commentlst:any;
  ngOnInit() {
this.userId=sessionStorage['userId'];
   
this.getBlogData();
   
     
    }; 
getBlogData()
{
  this.route.paramMap.subscribe((params) => {
   
    let selectId:number=this.route.snapshot.params['blogId'];
    selectId++;
     this.service.getBlogContent(selectId).subscribe(item => {
       this.blog = item;
       this.service.getBlogCommentsById(selectId).subscribe(commentList => {
         this.commentlst = commentList;
         console.log(commentList)
       });
     });
   });
}
deleteComment(commentId:any){


  this.service.deleteComment(commentId).subscribe(item => {
    console.log(item);
    this.commentlst=this.commentlst.filter((s:any)=>s.commentId !=commentId);
    this.toaster.success('Comment Deleted!', 'Comment');
  });

}
openModal(comment:any) {
  this.modal.open(comment);
}
parentFun(){
  this.getBlogData();
}
};