import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  newCategories: any[] = [];

  constructor(
    private router: Router,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (categories) => {
        this.newCategories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  navigateToCategoryProfile(categoryId: string): void {
    this.router.navigate(['/category-profile', categoryId]);
  }
}
