import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and FormGroup
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  newCategories: any[] = [];
  showCategoryCreationForm: boolean = false;
  categoryForm!: FormGroup; // Define the FormGroup

  constructor(
    private router: Router,
    private fb: FormBuilder, // Inject FormBuilder
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

    // Initialize the categoryForm with validators
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  createCategory(): void {
    if (this.categoryForm.valid) {
      const newCategory = this.categoryForm.value;

      this.categoryService.createCategory(newCategory).subscribe(
        (response) => {
          console.log('Category created successfully:', response);
          this.categoryForm.reset();
          this.showCategoryCreationForm = false;
        },
        (error) => {
          console.error('Error creating category:', error);
        }
        
      );
    }
    this.router.navigate(['/dashboard']);
  }

  navigateToCategoryProfile(categoryId: string): void {
    this.router.navigate(['/category-profile', categoryId]);
  }

  openCategoryCreationForm(): void {
    this.showCategoryCreationForm = true;
  }
}
