import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpAllocationProcessComponent } from './follow-up-allocation-process.component';

describe('FollowUpAllocationProcessComponent', () => {
  let component: FollowUpAllocationProcessComponent;
  let fixture: ComponentFixture<FollowUpAllocationProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowUpAllocationProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowUpAllocationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
