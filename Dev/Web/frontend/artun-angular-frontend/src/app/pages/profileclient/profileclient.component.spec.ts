import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileclientComponent } from './profileclient.component';

describe('ProfileclientComponent', () => {
  let component: ProfileclientComponent;
  let fixture: ComponentFixture<ProfileclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileclientComponent]
    });
    fixture = TestBed.createComponent(ProfileclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
