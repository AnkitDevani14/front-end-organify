import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/User';
import { ShopifyService } from 'src/app/service/shopify/shopify.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  constructor(private shopifyService:ShopifyService,
    private toastr: ToastrService) { }

  users :any;
  ngOnInit(): void {
    this.shopifyService.updateProfile().subscribe(
      (data) => {
        this.users = data;
        console.log(this.users);
      }
    )
  }

  updateProfile(){
    this.shopifyService.UpdateProfileData(this.users).subscribe(
      (data)=> {
        this.toastr.success("Update Successfull!!","Profile",{
          progressBar:true,
          closeButton:true
        })
      },
      (error)=> {
        this.toastr.error("Update Error","Profile",{
          progressBar:true,
          closeButton:true
        })
      }
    )
  }

}
