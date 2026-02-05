import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Produktuak } from './zitak';

describe('Produktuak', () => {
  let component: Produktuak;
  let fixture: ComponentFixture<Produktuak>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Produktuak]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Produktuak);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
