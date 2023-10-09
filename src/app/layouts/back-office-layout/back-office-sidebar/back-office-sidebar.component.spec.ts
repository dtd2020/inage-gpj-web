import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeSidebarComponent } from './back-office-sidebar.component';

describe('BackOfficeSidebarComponent', () => {
  let component: BackOfficeSidebarComponent;
  let fixture: ComponentFixture<BackOfficeSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackOfficeSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackOfficeSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
