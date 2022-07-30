import { CategoryService } from './../../services/category.service';
import { Category } from './../../models/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  defaultCategory:Category= { categoryId: 0, categoryName: "" };
  currentCategory: Category = { categoryId: 0, categoryName: "" };

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .subscribe(response => {
        this.categories = response.data;
      })
  }
  setCurrentCategory(category: Category) {
    this.currentCategory = category
  }
  getCurrentCategory(category: Category) {
    if (category == this.currentCategory) {
      return "list-group-item active";
    }
    return "list-group-item";
  }

  clearCurrentCategory(){
    this.currentCategory = this.defaultCategory;
   }

  getAllCategoryClass(){
    if(this.currentCategory.categoryName==""){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
}
