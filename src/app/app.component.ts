import { Component,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
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
}
