import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitezenLayoutComponent } from './citezen-layout.component';

describe('CitezenLayoutComponent', () => {
  let component: CitezenLayoutComponent;
  let fixture: ComponentFixture<CitezenLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitezenLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitezenLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
