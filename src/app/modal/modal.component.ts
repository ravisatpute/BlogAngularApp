import { Component, OnInit, ViewChild, ElementRef ,Output, EventEmitter} from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ToasterService } from '../services/toaster.service';
import { comment } from '../model/comment';
import {  first } from 'rxjs/operators';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(  private service: AuthService,
    private toast:ToasterService){

  }
  commentbox:any;
  commentData:comment;
  @ViewChild('myModal', {static: false}) modal: ElementRef;
  @Output("parentFun") parentFun: EventEmitter<any> = new EventEmitter();
  open(data:any) {
    console.log("data  ...",data);
   this. commentData=data;
    this.commentbox=data.comment;
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }
  onSubmit() {
    console.log("data coometn ...", this.commentbox);
    this.modal.nativeElement.style.display = 'none';
    this.commentData.description= this.commentbox;
    
    this.service.updateComment( this.commentData)
        .pipe(first())
        .subscribe(
            data => {
                
                this.toast.success('Comment Updated Successfully',"Comment");
                this.parentFun.emit();
            },
            error => {
               console.log(error(error));
                this.toast.error('Comment Failed to Update',"Comment");
            });
  }


}