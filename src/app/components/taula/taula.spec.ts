import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Taula } from './taula';

describe('Taula', () => {
  let component: Taula;
  let fixture: ComponentFixture<Taula>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Taula]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Taula);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
