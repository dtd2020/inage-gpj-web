import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAllocationFormComponent } from './single-allocation-form.component';

describe('SingleAllocationFormComponent', () => {
  let component: SingleAllocationFormComponent;
  let fixture: ComponentFixture<SingleAllocationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleAllocationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleAllocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
