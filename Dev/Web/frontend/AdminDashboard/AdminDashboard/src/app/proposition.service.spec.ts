import { TestBed } from '@angular/core/testing';

import { DemandService } from './proposition.service';

describe('PropositionService', () => {
  let service: DemandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
