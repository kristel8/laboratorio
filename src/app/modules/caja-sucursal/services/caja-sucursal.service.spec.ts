import { TestBed } from '@angular/core/testing';

import { CajaSucursalService } from './caja-sucursal.service';

describe('CajaSucursalService', () => {
  let service: CajaSucursalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CajaSucursalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
