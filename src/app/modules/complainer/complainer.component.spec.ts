import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainerComponent } from './complainer.component';

describe('ComplainerComponent', () => {
  let component: ComplainerComponent;
  let fixture: ComponentFixture<ComplainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
