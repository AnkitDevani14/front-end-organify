import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ShopifyService } from 'src/app/service/shopify/shopify.service';

@Component({
  selector: 'app-admin-change-pwd',
  templateUrl: './admin-change-pwd.component.html',
  styleUrls: ['./admin-change-pwd.component.css']
})
export class AdminChangePwdComponent implements OnInit {
  username: string;
  userId: any;

  constructor(private shopifyService:ShopifyService,
    private toastr: ToastrService) { }

    users :any;
    opwd='';
    npwd='';
    cpwd='';
  ngOnInit(): void {
  }

  checkpwd(){
   
    this.username = sessionStorage.getItem('username');
    this.shopifyService.findUser(this.username).subscribe(
      (data) => {
        
        this.shopifyService.checkpwd(data,this.opwd).subscribe(
          (data) => {
            if(data === true)
            {
              
              return true;
            }
            else{
             
              false;
              this.opwd = '';
            }
          }
        )
      }
    )
    
  }

  updatePassword(){
    this.username = sessionStorage.getItem('username');
    this.shopifyService.findUser(this.username).subscribe(
      (data) => {
        this.userId = data;
        const uploadImageData = new FormData();
        uploadImageData.append('uid',this.userId);
        uploadImageData.append('password', this.npwd);
        this.shopifyService.updatePasswordUser(uploadImageData).subscribe(
          (data) => {
            this.opwd='';
            this.npwd='';
            this.cpwd='';
            this.toastr.success("Changed Successfully!","Password",{
              progressBar:true,
              closeButton:true
            })
          },(error) => {
            this.toastr.error("Changed Error!","Password",{
              progressBar:true,
              closeButton:true
            })
          }
        )

        
      })
  
  }
} 
