import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeNavbarComponent } from './back-office-navbar.component';

describe('BackOfficeNavbarComponent', () => {
  let component: BackOfficeNavbarComponent;
  let fixture: ComponentFixture<BackOfficeNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackOfficeNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackOfficeNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
