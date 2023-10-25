import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessListAllComponent } from './process-list-all.component';

describe('ProcessListAllComponent', () => {
  let component: ProcessListAllComponent;
  let fixture: ComponentFixture<ProcessListAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessListAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
