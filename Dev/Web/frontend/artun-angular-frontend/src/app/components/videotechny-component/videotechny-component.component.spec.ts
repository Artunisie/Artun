import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideotechnyComponentComponent } from './videotechny-component.component';

describe('VideotechnyComponentComponent', () => {
  let component: VideotechnyComponentComponent;
  let fixture: ComponentFixture<VideotechnyComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideotechnyComponentComponent]
    });
    fixture = TestBed.createComponent(VideotechnyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
