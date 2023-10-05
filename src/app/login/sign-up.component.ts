import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { AbstractControl,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Validation from '../utility/validation';

@Component({
  selector: 'app-sign-up',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
//   userData;
//   keyboard: Keyboard;
  value = "";
  constructor(private builder: FormBuilder,private service: AuthService, private router: Router,
    private toastr: ToastrService
    ) { }
  result: any;
  userData: any = {
    UserId :0,
    UserName :'',
    Email:'',
    Password :'',
    Address :'',
    
    
  };

  registerform: FormGroup;
  submitted = false;
 
  ngOnInit() {
  this.registerform = this.builder.group(
    {
      userId: this.builder.control(0),
     userName: this.builder.control('', Validators.required),
    address: this.builder.control('',Validators.required),
    //password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    //c_password:this.builder.control('',Validators.required),
  

      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]
      ],
      c_password: ['', Validators.required]
    },
    {
      validators: [Validation.match('password', 'c_password')]
    }
  
  );
}


get f(): { [key: string]: AbstractControl } {
  return this.registerform.controls;
}


  signUp(){
    
  }

  ngAfterViewInit() {
    // this.keyboard = new Keyboard({
    //   onChange: input => this.onChange(input),
    //   onKeyPress: button => this.onKeyPress(button),
    //   mergeDisplay: true,
    //   layoutName: "default",
    //   layout: {
    //     default: [
    //       "q w e r t y u i o p",
    //       "a s d f g h j k l",
    //       "{shift} z x c v b n m {backspace}",
    //       "{numbers} {space} {ent}"
    //     ],
    //     shift: [
    //       "Q W E R T Y U I O P",
    //       "A S D F G H J K L",
    //       "{shift} Z X C V B N M {backspace}",
    //       "{numbers} {space} {ent}"
    //     ],
    //     numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {backspace}"]
    //   },
    //   display: {
    //     "{numbers}": "123",
    //     "{ent}": "return",
    //     "{escape}": "esc ⎋",
    //     "{tab}": "tab ⇥",
    //     "{backspace}": "⌫",
    //     "{capslock}": "caps lock ⇪",
    //     "{shift}": "⇧",
    //     "{controlleft}": "ctrl ⌃",
    //     "{controlright}": "ctrl ⌃",
    //     "{altleft}": "alt ⌥",
    //     "{altright}": "alt ⌥",
    //     "{metaleft}": "cmd ⌘",
    //     "{metaright}": "cmd ⌘",
    //     "{abc}": "ABC"
    //   }
      
    // });
  }


  onSubmit() {
    this.submitted = true;

    console.log(this.registerform);
    if (this.registerform.valid) {
      this.service.addUser(this.registerform.value).subscribe(result => {
        this.toastr.success('User Registered Successfully','User Registeration.')
        this.router.navigate(['login'])
      });
    } else {
    //  this.toastr.error('Please Enter Valid Form Data.')
  
    }
  }

 
}