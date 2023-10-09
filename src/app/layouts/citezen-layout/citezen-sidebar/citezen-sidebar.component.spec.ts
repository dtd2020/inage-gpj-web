import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitezenSidebarComponent } from './citezen-sidebar.component';

describe('CitezenSidebarComponent', () => {
  let component: CitezenSidebarComponent;
  let fixture: ComponentFixture<CitezenSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitezenSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitezenSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
