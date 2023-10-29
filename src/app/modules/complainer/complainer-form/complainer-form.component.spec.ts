import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainerFormComponent } from './complainer-form.component';

describe('ComplainerFormComponent', () => {
  let component: ComplainerFormComponent;
  let fixture: ComponentFixture<ComplainerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplainerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplainerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
