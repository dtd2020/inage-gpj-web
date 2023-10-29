import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainerListComponent } from './complainer-list.component';

describe('ComplainerListComponent', () => {
  let component: ComplainerListComponent;
  let fixture: ComponentFixture<ComplainerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplainerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplainerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
