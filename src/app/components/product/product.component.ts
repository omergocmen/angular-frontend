import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products:Product[]=[];
  dataLoaded=false;
  filterText="";
  
  constructor
  (private productService:ProductService
    ,private activedRoute:ActivatedRoute
    ,private toastrService:ToastrService
    ,private cartService:CartService) { }

  //observable demek yakalamak demek!
  ngOnInit(): void {
    this.activedRoute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getProductsByCategory(params["categoryId"]);
      }else{
        this.getProducts();
      }
    })
  }

  getProducts(){
    this.productService
    .getProducts()
    .subscribe(response=>{
      this.products=response.data;
      this.dataLoaded=true;
    });
  };

  getProductsByCategory(categoryId:number){
    this.productService
    .getProductsByCategory(categoryId)
    .subscribe(response=>{
      this.products=response.data;
      this.dataLoaded=true;
    });
  };

  addToCart(product:Product){
    this.cartService.addToCart(product);
    this.toastrService.success(product.productName+" sepete eklendi");
  }

}
