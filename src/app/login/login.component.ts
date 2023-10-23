import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from "../Services/auth.service";
import { ToasterService } from "../services/toaster.service";
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  userData: any = {
    email:'',
    password:''
    
  };

  constructor(private builder: FormBuilder, private toastr:ToasterService, private router: Router,private service: AuthService) {
    sessionStorage.clear();
  }

  loginform = this.builder.group({
      email: this.builder.control('', Validators.required),
      password: this.builder.control('', Validators.required)
    });
  
  ngOnInit() {

  }

result: any;

proceedlogin(userData:any) {
  if (this.userData.email && this.userData.password) {
  

    this.service.LogUser(userData).subscribe(item => {
      this.result = item;
      if (this.result!=null ) {
        if (this.result!=null && this.result!=undefined ) {
          sessionStorage.setItem('username',this.result.userName);
          sessionStorage.setItem('userId',this.result.userId);
          sessionStorage.setItem('token',this.result.token)
          sessionStorage.setItem('role',this.result.role);
        
          this.router.navigate(['']);
        } else {
          this.toastr.error('Please contact Admin', 'InActive User');
        }
      } else {
        this.toastr.warning('Invalid credentials');
      }
    },(err:any)=>{
      this.toastr.warning('Invalid credentials');
      console.log("err",err);
    });

  } else {
    this.toastr.warning('Please enter valid details.')
  }
}
}