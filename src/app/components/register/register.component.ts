import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/User';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ShopifyService } from 'src/app/service/shopify/shopify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http:HttpClient,
    private toastr:ToastrService,
    private shopifyService:ShopifyService,private router:Router) { }

  users : Users = new Users('','','','','');

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.users != null){
      this.shopifyService.registerUsers(this.users).subscribe(
        (data) => {
          console.log(data);
        }
      )
      this.toastr.success('Registered Successfully','Success',{
        progressBar:true,
        closeButton:true
      });
      this.router.navigate(['/login']);
    }else{
      this.toastr.error('An Error Occured!','Error',{
        progressBar:true,
        closeButton:true
      });
    }
  }

}
