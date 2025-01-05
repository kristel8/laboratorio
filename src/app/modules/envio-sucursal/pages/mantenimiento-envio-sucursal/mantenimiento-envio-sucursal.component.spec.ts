import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoEnvioSucursalComponent } from './mantenimiento-envio-sucursal.component';

describe('MantenimientoEnvioSucursalComponent', () => {
  let component: MantenimientoEnvioSucursalComponent;
  let fixture: ComponentFixture<MantenimientoEnvioSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoEnvioSucursalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoEnvioSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
