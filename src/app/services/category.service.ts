import { Category } from './../models/category';
import { Injectable } from '@angular/core';//Injectable service'lerde kullanılır
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl="https://localhost:44302/api/Categories/getall";
  constructor(private httpClient:HttpClient) { }

  getCategories():Observable<ListResponseModel<Category>>{//Observable yakalanabilir
    return this.httpClient
    .get<ListResponseModel<Category>>(this.apiUrl)
  }
}
