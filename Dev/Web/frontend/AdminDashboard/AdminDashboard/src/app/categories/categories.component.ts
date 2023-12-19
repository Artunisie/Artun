import { Component } from '@angular/core';
import { CategoryService } from '../category.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  newUsers: any[] = [];

  constructor(
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (categories) => {
        this.newUsers = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}
