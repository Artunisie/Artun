import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueclientComponent } from './historiqueclient.component';

describe('HistoriqueclientComponent', () => {
  let component: HistoriqueclientComponent;
  let fixture: ComponentFixture<HistoriqueclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueclientComponent]
    });
    fixture = TestBed.createComponent(HistoriqueclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
