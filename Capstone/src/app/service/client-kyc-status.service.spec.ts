import { TestBed } from '@angular/core/testing';

import { ClientKycStatusService } from './client-kyc-status.service';

describe('ClientKycStatusService', () => {
  let service: ClientKycStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientKycStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
