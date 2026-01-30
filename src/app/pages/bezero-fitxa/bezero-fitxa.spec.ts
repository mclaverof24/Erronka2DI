import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BezeroFitxa } from './bezero-fitxa';

describe('BezeroFitxa', () => {
  let component: BezeroFitxa;
  let fixture: ComponentFixture<BezeroFitxa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BezeroFitxa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BezeroFitxa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
