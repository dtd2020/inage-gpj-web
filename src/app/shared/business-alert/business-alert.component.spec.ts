import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAlertComponent } from './business-alert.component';

describe('BusinessAlertComponent', () => {
  let component: BusinessAlertComponent;
  let fixture: ComponentFixture<BusinessAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
