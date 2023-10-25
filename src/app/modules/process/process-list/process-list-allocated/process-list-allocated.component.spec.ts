import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessListAllocatedComponent } from './process-list-allocated.component';

describe('ProcessListAllocatedComponent', () => {
  let component: ProcessListAllocatedComponent;
  let fixture: ComponentFixture<ProcessListAllocatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessListAllocatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessListAllocatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
