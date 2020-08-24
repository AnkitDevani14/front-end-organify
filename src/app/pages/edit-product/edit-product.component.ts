import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopifyService } from 'src/app/service/shopify/shopify.service';
import { Productslist } from 'src/app/model/Products-full';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    private shoifyService:ShopifyService,
    private toastr:ToastrService,
    private router:Router) { }

   product ;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      if(id){
        this.shoifyService.getProductById(id).subscribe(
          (data) => {
            this.product = data;
            console.log(this.product);
          }
        )
      }
    })
  }

  addProduct(){
   
    const uploadImageData = new FormData();
    uploadImageData.append('id',this.product.id);
    uploadImageData.append('productName', this.product.productName);
    uploadImageData.append('price', this.product.price.toString());
    uploadImageData.append('quantity', this.product.quantity.toString());
    uploadImageData.append('description', this.product.description);
   
    this.shoifyService.updateProduct(uploadImageData).subscribe(
      (data)=> {
        
        

        this.toastr.success("Sucess");
        this.router.navigateByUrl('products');
      },
      (error) => {
       
        this.toastr.error("error");
      }

    )
  }

}
