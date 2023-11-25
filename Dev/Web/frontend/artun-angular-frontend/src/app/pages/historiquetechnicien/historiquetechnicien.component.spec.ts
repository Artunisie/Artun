import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquetechnicienComponent } from './historiquetechnicien.component';

describe('HistoriquetechnicienComponent', () => {
  let component: HistoriquetechnicienComponent;
  let fixture: ComponentFixture<HistoriquetechnicienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriquetechnicienComponent]
    });
    fixture = TestBed.createComponent(HistoriquetechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
