// category-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service'; 

@Component({
  selector: 'app-category-profile',
  templateUrl: './category-profile.component.html',
  styleUrls: ['./category-profile.component.css']
})
export class CategoryProfileComponent implements OnInit {
  category: any = null;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('id');
      if (categoryId) {
        this.loadCategory(categoryId);
      }
    });
  }

  loadCategory(categoryId: string): void {
    this.categoryService.getCategoryById(categoryId).subscribe(
      (category) => {
        console.log('Loaded category:', category);
        this.category = category;
      },
      (error) => {
        console.error('Error fetching category:', error);
      }
    );
  }
  

  blockCategory(categoryId: string): void {
    // Implement your block category logic here
  }

  unblockCategory(categoryId: string): void {
    // Implement your unblock category logic here
  }
}
