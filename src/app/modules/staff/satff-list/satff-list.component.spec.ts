import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatffListComponent } from './satff-list.component';

describe('SatffListComponent', () => {
  let component: SatffListComponent;
  let fixture: ComponentFixture<SatffListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SatffListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
