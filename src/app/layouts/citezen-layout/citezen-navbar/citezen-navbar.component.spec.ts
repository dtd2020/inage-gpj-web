import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitezenNavbarComponent } from './citezen-navbar.component';

describe('CitezenNavbarComponent', () => {
  let component: CitezenNavbarComponent;
  let fixture: ComponentFixture<CitezenNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitezenNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitezenNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
