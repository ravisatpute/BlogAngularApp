import { Component,DoCheck } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';


import {ToastrService} from 'ngx-toastr'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'authentication';
  isadmin=false;
  isMenuVisible:boolean=false;
  constructor(private route:Router,public toastr: ToastrService){
  
     }
  
  ngDoCheck(): void {
    let currentroute = this.route.url;
    if (currentroute == '/sign-up'||currentroute == '/login'){
      this.isMenuVisible = false
    } else {
      this.isMenuVisible = true
    }
  }

  showSuccess(){
    this.toastr.success('everything is broken', 'Major Error', {
   timeOut: 3000,
 });
   }
   showError(){
    this.toastr.error('everything is broken', 'Major Error', {
   timeOut: 3000,
 });
   }
    showInfo(){
    this.toastr.info('everything is broken', 'Major Error', {
   timeOut: 3000,
 });
   }
    showWarning(){
    this.toastr.warning('everything is broken', 'Major Error', {
   timeOut: 3000,
 });
   }
}
