import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicienHeaderComponent } from './technicien-header.component';

describe('TechnicienHeaderComponent', () => {
  let component: TechnicienHeaderComponent;
  let fixture: ComponentFixture<TechnicienHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicienHeaderComponent]
    });
    fixture = TestBed.createComponent(TechnicienHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
