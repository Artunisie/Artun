import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeClientComponent } from './demande-client.component';

describe('DemandeClientComponent', () => {
  let component: DemandeClientComponent;
  let fixture: ComponentFixture<DemandeClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeClientComponent]
    });
    fixture = TestBed.createComponent(DemandeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
