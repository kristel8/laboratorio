import { TestBed } from '@angular/core/testing';

import { ImportarProductoService } from './importar-producto.service';

describe('ImportarProductoService', () => {
  let service: ImportarProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportarProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
