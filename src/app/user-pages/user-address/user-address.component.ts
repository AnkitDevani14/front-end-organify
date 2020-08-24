import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ShopifyService } from 'src/app/service/shopify/shopify.service';
import { Address } from 'src/app/model/Address';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {

  cart ;
  total;
  username;
  userId;
  user:any;
  valid;
  path: any;
  constructor(private shopify:ShopifyService,
    private toastr:ToastrService,
    private router:Router,private spinner: NgxSpinnerService) { }

  address1 : any = new Address('','','','',this.userId);

  

  ngOnInit(): void {
    this.load();
    this.loadAddress();
  }
  saveAddress(){
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 7000);
    console.log(this.address1);
    this.address1 = new Address(this.address1.address,this.address1.city,this.address1.state,this.address1.zipcode,this.userId);
    console.log(this.address1);
    this.shopify.saveAddress(this.address1).subscribe(
      (data) => {
        
        this.shopify.saveToSales(this.userId).subscribe(
          (data) => {
           
            if(data === true){
              
              this.shopify.report(this.userId).subscribe(
                (data) => {
                 
                  window.open("http://localhost:4200/assets/invoice/java.util.Random@247bf87e5.pdf");
                  this.router.navigate(['']);  
                },(error) => {
                  console.log("rthbbhd"+error);
                  this.toastr.success("erro You");
                  
                  
                }
              )
              
              
             
              
            }
          },(error)=>{
            
            this.toastr.error("Not Place order","Erorr",{
              progressBar:true,
              closeButton:true
            })
          }
        )
      },(error)=>{
        alert(5);
        this.toastr.error("Not Place order","Erorr",{
          progressBar:true,
          closeButton:true
        })
      }
    )
  }

  loadAddress(){
    this.shopify.findUserByUsername(sessionStorage.getItem('username')).subscribe(
      (data) => {
        this.shopify.address(data).subscribe(
          (data) => {
            this.address1 = data;
            console.log(this.address1);
          }
        )
      }
    )
}
  load(){
    this.shopify.findUserByUsername(sessionStorage.getItem('username')).subscribe(
      (data) => {
        this.userId = data;
        this.user = data;
        console.log(this.userId);
        console.log(data);
        this.shopify.getCart(this.userId).subscribe(
          (data) => {
            this.cart = data;
            console.log(this.cart);
          }
        )
        this.shopify.getCartTotal(this.userId).subscribe(
          (data) => {
            this.total = data;
            console.log(this.total);
          }
        )
      }
    )
  }


}
