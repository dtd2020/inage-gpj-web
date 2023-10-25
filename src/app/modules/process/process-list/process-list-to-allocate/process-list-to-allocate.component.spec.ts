import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessListToAllocateComponent } from './process-list-to-allocate.component';

describe('ProcessListToAllocateComponent', () => {
  let component: ProcessListToAllocateComponent;
  let fixture: ComponentFixture<ProcessListToAllocateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessListToAllocateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessListToAllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
