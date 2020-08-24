import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShopifyService } from 'src/app/service/shopify/shopify.service';

@Component({
  selector: 'app-user-shop',
  templateUrl: './user-shop.component.html',
  styleUrls: ['./user-shop.component.css']
})
export class UserShopComponent implements OnInit {

  categotyList : Category[] = [];
  productList : [] = [];
  userId;
  pid: any;
  username;

  constructor(private shopifyService:ShopifyService,
    private toastr:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.getCategory();
    this.getProducts();
   
  }

  isLoggedIn(){
    if(sessionStorage.getItem('token') && sessionStorage.getItem('username') != 'admin')
    {
      return true;
    }
    return false;
  }

  getCategory(){
    this.shopifyService.listCategory().subscribe(
      (data : Category [])=> {
        this.categotyList = data;
        console.log(this.categotyList);
        
      },
      error => {
        this.toastr.error("Error!!!!",'category',{
          closeButton:true,
          progressBar:true
        })
      }
    )
  }

  getProducts(){
    this.shopifyService.listProducts().subscribe(
      (data : [])=> {
        this.productList = data;
        console.log(this.productList);
        
      },
      error => {
        this.toastr.error("Error!!!!",'category',{
          closeButton:true,
          progressBar:true
        })
      }
    )
  }

  getProductById(id){

    this.shopifyService.listProductsById(id).subscribe(
      (data : [])=> {
            this.productList = data;
            console.log(this.productList);
            
          },
          error => {
            this.toastr.error("Error!!!!",'category',{
              closeButton:true,
              progressBar:true
            })
          }
    )
    // this.shopifyService.userlistProductsById(id).subscribe(
    //   
    // )
  }

  addToCart(id){
    if(!this.isLoggedIn()){
      this.router.navigateByUrl('login');
      this.toastr.error("Your are't logged in","Error",{
        progressBar:true,
        closeButton:true
      })
    }else{
      this.pid  = id;
      this.username = sessionStorage.getItem('username');
      this.shopifyService.findUserByUsername(this.username).subscribe(
        (data)=> {
          this.userId = data;
          console.log(this.userId);
          this.shopifyService.activeCart(id,data).subscribe(
            (data) => {
              if(data === false){
                const uploadImageData = new FormData();
                uploadImageData.append('user_id', this.userId);
         
                uploadImageData.append('product_id',id);
                this.shopifyService.addToCart(uploadImageData).subscribe(
                  (data) => {
                  this.toastr.success("Added","In Cart",{
                    progressBar:true,
                    closeButton: true
                  })
                  },(error) => {
                    this.toastr.error("Error","In Cart",{
                      progressBar:true,
                      closeButton: true
                    })
                  }
                )
              }else {
                this.toastr.error("Error","Already Added",{
                  progressBar:true,
                  closeButton: true
                })
              }
            },
          )
          
        }
      )
     
      
    }
  }

  viewProduct(id){
    if(!this.isLoggedIn()){
      this.router.navigateByUrl('login');
      this.toastr.error("Your are't logged in","Error",{
        progressBar:true,
        closeButton:true
      })
    }else{
      this.router.navigate(['/view-product', id]);
    }
  }

}
