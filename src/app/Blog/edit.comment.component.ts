import { Component,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'edit-comment',
  templateUrl: './edit.comment.component.html'
//   styleUrls: [ './app.component.css' ]
})
export class EditCommentComponent {
  name = 'Angular 6';
  @ViewChild('myform') form : NgForm;
  data = [{
    recipient : 'Demo',
    message : 'Demo Message'
  }];
  editMode = false;
  editIndex:any;

  constructor(public ngxSmartModalService: NgxSmartModalService) {
  }

  addData(form:any){
    var val = form.controls;
    const newData ={
      recipient : val.rec.value,
      message : val.msg.value
    }
    if(this.editMode){
      this.data[this.editIndex] = newData;
    }else{
      this.data.push(newData);
    }
    this.form.reset();
    this.ngxSmartModalService.close('myModal');
  }

  onDel(index:any){
    this.data.splice(index,1);
  }

  onEdit(index:any){
    this.editMode = true;
    this.editIndex = index;
    this.ngxSmartModalService.open('myModal');
    this.form.setValue({
      rec:this.data[index].recipient,
      msg:this.data[index].message
    });
  }

  closeModal(id:any){
     this.form.reset();
    this.editMode=false;
    this.ngxSmartModalService.close(id);
  }
}
