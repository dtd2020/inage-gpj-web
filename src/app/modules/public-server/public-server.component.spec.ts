import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicServerComponent } from './public-server.component';

describe('PublicServerComponent', () => {
  let component: PublicServerComponent;
  let fixture: ComponentFixture<PublicServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicServerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
