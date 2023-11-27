import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicienMainComponent } from './technicien-main.component';

describe('TechnicienMainComponent', () => {
  let component: TechnicienMainComponent;
  let fixture: ComponentFixture<TechnicienMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicienMainComponent]
    });
    fixture = TestBed.createComponent(TechnicienMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
