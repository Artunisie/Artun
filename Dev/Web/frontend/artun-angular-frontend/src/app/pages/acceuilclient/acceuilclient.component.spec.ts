import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilclientComponent } from './acceuilclient.component';

describe('AcceuilclientComponent', () => {
  let component: AcceuilclientComponent;
  let fixture: ComponentFixture<AcceuilclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceuilclientComponent]
    });
    fixture = TestBed.createComponent(AcceuilclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
