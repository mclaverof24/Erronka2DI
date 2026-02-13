import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZitakForm } from './zitak-form';

describe('ZitakForm', () => {
  let component: ZitakForm;
  let fixture: ComponentFixture<ZitakForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZitakForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZitakForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
