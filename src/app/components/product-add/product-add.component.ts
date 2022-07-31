import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm:FormGroup;

  constructor
  (private formBuilder:FormBuilder
  ,private productService:ProductService
  ,private toastrService:ToastrService) 
  { }

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm(){
    this.productAddForm=this.formBuilder.group({
      productName:["",Validators.required],
      categoryId:["",Validators.required],
      unitPrice:["",Validators.required],
      unitsInStock:["",Validators.required]
    })
  }

  add(){
    if(this.productAddForm.valid){
      let productModel=Object.assign({},this.productAddForm.value);
      this.productService.add(productModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı !");
      },err=>{
        if(err.error.Errors.length>0){
          for (let index = 0; index < err.error.Errors.length; index++) {     
            this.toastrService.error(err.error.Errors[index].ErrorMessage,"Doğrulama hatası"); 
          }
        }
      });
    }else{
     this.toastrService.error("Form eksik ya da hatalı","Hata!"); 
    }
  }

}
