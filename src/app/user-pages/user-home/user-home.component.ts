import { Component, OnInit } from '@angular/core';
import { ShopifyService } from 'src/app/service/shopify/shopify.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/Category';
import { Cart } from 'src/app/model/Cart';
import { NgxSpinnerService } from "ngx-spinner";
 

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  categotyList : Category[] = [];
  productList : [] = [];
  username;
  userId;
  pid: any;
  cart : Cart = new Cart(this.userId,this.pid);
  

  constructor(private shopifyService:ShopifyService,
    private toastr:ToastrService,
    private router:Router,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
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
                this.shopifyService.activeCart(id,this.userId).subscribe(
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

