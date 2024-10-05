import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveKycStatusComponent } from './approve-kyc-status.component';

describe('ApproveKycStatusComponent', () => {
  let component: ApproveKycStatusComponent;
  let fixture: ComponentFixture<ApproveKycStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproveKycStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveKycStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
