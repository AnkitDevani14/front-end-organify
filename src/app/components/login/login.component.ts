import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,
    private toastr:ToastrService,
    private router:Router) { }

  users : Users = new Users('','','','','');

  ngOnInit(): void {
    
  }

  loginNow(){
    this.authService.authenticate(this.users.username,this.users.password).subscribe(
      (data) => {
       
          sessionStorage.setItem("username", this.users.username);
          let tokenStr = "Bearer " + data.token;
          sessionStorage.setItem("token", tokenStr);

          this.authService.findUserRole(this.users.username).subscribe(
            (data) => {
              if(data.roles === 'ROLE_USER'){
                return this.router.navigateByUrl('');
              }else if(data.roles === 'ROLE_ADMIN'){
                return this.router.navigateByUrl('admin-home');
              }
            },
            (error) => {
              return this.toastr.error("Login Error" + error,"LOGIN",{
                closeButton:true,
                progressBar:true
              })
            }
          )
         
         
      },
      (error) => {
        return this.toastr.error("Login Error" + error,"LOGIN",{
          closeButton:true,
          progressBar:true
        })
      }
    )
  }

}
