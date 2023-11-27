import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionCliProfessComponent } from './option-cli-profess.component';

describe('OptionCliProfessComponent', () => {
  let component: OptionCliProfessComponent;
  let fixture: ComponentFixture<OptionCliProfessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionCliProfessComponent]
    });
    fixture = TestBed.createComponent(OptionCliProfessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
