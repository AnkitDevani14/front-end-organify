import { Component, OnInit } from '@angular/core';
import { ShopifyService } from 'src/app/service/shopify/shopify.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-sales',
  templateUrl: './admin-sales.component.html',
  styleUrls: ['./admin-sales.component.css']
})
export class AdminSalesComponent implements OnInit {
  year: any;
  month: any;
  sales: any;

  constructor(private shopifyService:ShopifyService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onMonthSelect(event){
    if(event.target.value === '0'){
      this.toastr.error("error");
      
    }
    else{
      this.month = event.target.value;
     
    }
   
  }

  onYearSelect(event){
    if(event.target.value === '0'){
      this.toastr.error("error");
      
    }
    else{
      this.year = event.target.value;
     
    }
   
  }

  getList(){
    this.shopifyService.listSales(this.month,this.year).subscribe(
      (data) => {
        this.sales = data;
      },(error) => {
        this.toastr.error("list-sales","Error",{
          progressBar:true,
          closeButton:true
        })
      }
    )
  }
}
