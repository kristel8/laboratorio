import { TestBed } from '@angular/core/testing';
import { EnvioSucursalService } from './envio-sucursal.service';


describe('AlmacenCentralService', () => {
  let service: EnvioSucursalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvioSucursalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
