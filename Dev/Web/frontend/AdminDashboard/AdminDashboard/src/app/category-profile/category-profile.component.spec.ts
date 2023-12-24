import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProfileComponent } from './category-profile.component';

describe('CategoryProfileComponent', () => {
  let component: CategoryProfileComponent;
  let fixture: ComponentFixture<CategoryProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryProfileComponent]
    });
    fixture = TestBed.createComponent(CategoryProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
