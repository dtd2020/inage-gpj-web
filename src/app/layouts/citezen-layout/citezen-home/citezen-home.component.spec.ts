import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitezenHomeComponent } from './citezen-home.component';

describe('CitezenHomeComponent', () => {
  let component: CitezenHomeComponent;
  let fixture: ComponentFixture<CitezenHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitezenHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitezenHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
