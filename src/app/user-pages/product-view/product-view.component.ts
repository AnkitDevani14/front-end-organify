import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopifyService } from 'src/app/service/shopify/shopify.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  pid: any;
  username: string;
  userId;

  constructor(private route:ActivatedRoute,
    private shopifyService:ShopifyService,
    private toastr:ToastrService,
    private router:Router) { }
    product;
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const id = +params.get('id');
        if(id){
          this.shopifyService.getProductById(id).subscribe(
            (data) => {
              this.product = data;
              console.log(this.product);
            }
          )
        }
      })
    }
    isLoggedIn(){
      if(sessionStorage.getItem('token') && sessionStorage.getItem('username') != 'admin')
      {
        return true;
      }
      return false;
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
 
}

