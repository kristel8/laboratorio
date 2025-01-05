import { TestBed } from '@angular/core/testing';

import { AlmacenSucursalService } from './almacen-sucursal.service';

describe('AlmacenSucursalService', () => {
  let service: AlmacenSucursalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlmacenSucursalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
