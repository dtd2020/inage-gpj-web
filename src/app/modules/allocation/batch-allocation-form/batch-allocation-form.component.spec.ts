import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchAllocationFormComponent } from './batch-allocation-form.component';

describe('AllocationFormComponent', () => {
  let component: BatchAllocationFormComponent;
  let fixture: ComponentFixture<BatchAllocationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchAllocationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchAllocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
