import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffFollowUpAllocationProcessComponent } from './staff-follow-up-allocation-process.component';

describe('StaffFollowUpAllocationProcessComponent', () => {
  let component: StaffFollowUpAllocationProcessComponent;
  let fixture: ComponentFixture<StaffFollowUpAllocationProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffFollowUpAllocationProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffFollowUpAllocationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
