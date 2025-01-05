import { TestBed } from '@angular/core/testing';

import { ConfigDocumentoImpresoService } from './config-documento-impreso.service';

describe('ConfigDocumentoImpresoService', () => {
  let service: ConfigDocumentoImpresoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigDocumentoImpresoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
