import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveClientRequestPaymentComponent } from './approve-client-request-payment.component';

describe('ApproveClientRequestPaymentComponent', () => {
  let component: ApproveClientRequestPaymentComponent;
  let fixture: ComponentFixture<ApproveClientRequestPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproveClientRequestPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveClientRequestPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
