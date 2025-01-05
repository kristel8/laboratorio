import { TestBed } from '@angular/core/testing';

import { AlmacenCentralService } from './almacen-central.service';

describe('AlmacenCentralService', () => {
  let service: AlmacenCentralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlmacenCentralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
