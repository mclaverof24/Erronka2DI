import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BezeroForm } from './bezero-form';

describe('BezeroForm', () => {
  let component: BezeroForm;
  let fixture: ComponentFixture<BezeroForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BezeroForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BezeroForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
