import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bezeroak } from './bezeroak';

describe('Bezeroak', () => {
  let component: Bezeroak;
  let fixture: ComponentFixture<Bezeroak>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bezeroak]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bezeroak);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
