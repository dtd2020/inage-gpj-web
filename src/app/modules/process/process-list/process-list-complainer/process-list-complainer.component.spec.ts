import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessListComplainerComponent } from './process-list-complainer.component';

describe('ProcessListComplainerComponent', () => {
  let component: ProcessListComplainerComponent;
  let fixture: ComponentFixture<ProcessListComplainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessListComplainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessListComplainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
