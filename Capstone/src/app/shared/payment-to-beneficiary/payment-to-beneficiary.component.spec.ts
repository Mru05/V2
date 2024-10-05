import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentToBeneficiaryComponent } from './payment-to-beneficiary.component';

describe('PaymentToBeneficiaryComponent', () => {
  let component: PaymentToBeneficiaryComponent;
  let fixture: ComponentFixture<PaymentToBeneficiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentToBeneficiaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentToBeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
