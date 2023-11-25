import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeComponent } from './demande.component';

describe('DemandeComponent', () => {
  let component: DemandeComponent;
  let fixture: ComponentFixture<DemandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeComponent]
    });
    fixture = TestBed.createComponent(DemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
