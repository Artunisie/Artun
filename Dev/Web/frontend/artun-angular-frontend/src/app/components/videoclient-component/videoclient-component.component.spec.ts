import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoclientComponentComponent } from './videoclient-component.component';

describe('VideoclientComponentComponent', () => {
  let component: VideoclientComponentComponent;
  let fixture: ComponentFixture<VideoclientComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoclientComponentComponent]
    });
    fixture = TestBed.createComponent(VideoclientComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
