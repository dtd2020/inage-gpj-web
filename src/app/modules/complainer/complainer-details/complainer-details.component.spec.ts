import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainerDetailsComponent } from './complainer-details.component';

describe('ComplainerDetailsComponent', () => {
  let component: ComplainerDetailsComponent;
  let fixture: ComponentFixture<ComplainerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplainerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplainerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
