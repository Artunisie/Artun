import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-profile',
  templateUrl: './category-profile.component.html',
  styleUrls: ['./category-profile.component.css']
})
export class CategoryProfileComponent implements OnInit {
  category: any;
  showCategoryUpdateForm: boolean = false;
  categoryForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('id');
      if (categoryId) {
        this.loadCategory(categoryId);
      }
    });

    // Initialize the category form for update
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  loadCategory(categoryId: string): void {
    this.categoryService.getCategoryById(categoryId).subscribe(
      (category) => {
        this.category = category;
      },
      (error) => {
        console.error('Error fetching category:', error);
      }
    );
  }

  updateCategory(): void {
    if (this.categoryForm.valid) {
      const categoryId = this.category._id;
      const updatedCategoryData = this.categoryForm.value;

      this.categoryService.updateCategory(categoryId, updatedCategoryData).subscribe(
        (response) => {
          console.log('Category updated successfully:', response);
          this.showCategoryUpdateForm = false;
          // Optionally, you can reload the updated category
          this.loadCategory(categoryId);
          this.router.navigate(['/Categories']);

        },
        (error) => {
          console.error('Error updating category:', error);
        }
      );
    }
  }

  deleteCategory(): void {
    this.categoryService.deleteCategory(this.category._id).subscribe(
      () => {
        console.log('Category deleted successfully');
        // Redirect to the categories component after deletion
        this.router.navigate(['/Categories']);
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
  }

  // Method to open the update category form
  openUpdateCategoryForm(): void {
    this.showCategoryUpdateForm = true;
    // Pre-fill the form with the current category name
    this.categoryForm.patchValue({
      name: this.category.name,
    });
  }

  // Method to cancel the update category form
  cancelUpdateCategory(): void {
    this.showCategoryUpdateForm = false;
    // Reset the form
    this.categoryForm.reset();
  }
}
