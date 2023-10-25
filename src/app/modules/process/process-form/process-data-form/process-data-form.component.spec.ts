import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDataFormComponent } from './process-data-form.component';

describe('ProcessDataFormComponent', () => {
  let component: ProcessDataFormComponent;
  let fixture: ComponentFixture<ProcessDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessDataFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
