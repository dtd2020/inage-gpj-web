import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainerFollowUpAllocationProcessComponent } from './complainer-follow-up-allocation-process.component';

describe('ComplainerFollowUpAllocationProcessComponent', () => {
  let component: ComplainerFollowUpAllocationProcessComponent;
  let fixture: ComponentFixture<ComplainerFollowUpAllocationProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplainerFollowUpAllocationProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplainerFollowUpAllocationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
