import { ResponseModel } from './../models/responseModel';
import { Product } from './../models/product';
import { Injectable } from '@angular/core';//Injectable service'lerde kullanılır
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "https://localhost:44302/api/";
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ListResponseModel<Product>> {//Observable yakalanabilir
    let newPath = this.apiUrl + "products/getall";
    return this.httpClient
      .get<ListResponseModel<Product>>(newPath)
  }
  getProductsByCategory(categoryId: number): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "Products/getbycategoryid?categoryId=" + categoryId;
    return this.httpClient
      .get<ListResponseModel<Product>>(newPath)
  }


  add(product:Product):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"products/add",product);
  }

}
