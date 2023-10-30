import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestComplainerLayoutComponent } from './guest-complainer-layout.component';

describe('GuestComplainerLayoutComponent', () => {
  let component: GuestComplainerLayoutComponent;
  let fixture: ComponentFixture<GuestComplainerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestComplainerLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestComplainerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
