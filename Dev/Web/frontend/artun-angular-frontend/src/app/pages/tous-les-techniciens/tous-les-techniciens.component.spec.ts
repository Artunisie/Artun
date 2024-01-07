import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TousLesTechniciensComponent } from './tous-les-techniciens.component';

describe('TousLesTechniciensComponent', () => {
  let component: TousLesTechniciensComponent;
  let fixture: ComponentFixture<TousLesTechniciensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TousLesTechniciensComponent]
    });
    fixture = TestBed.createComponent(TousLesTechniciensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
