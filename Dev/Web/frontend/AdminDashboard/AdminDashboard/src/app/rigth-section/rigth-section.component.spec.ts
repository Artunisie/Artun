import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RigthSectionComponent } from './rigth-section.component';

describe('RigthSectionComponent', () => {
  let component: RigthSectionComponent;
  let fixture: ComponentFixture<RigthSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RigthSectionComponent]
    });
    fixture = TestBed.createComponent(RigthSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
