import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAlmacenSucursalComponent } from './detalle-almacen-sucursal.component';

describe('DetalleAlmacenSucursalComponent', () => {
  let component: DetalleAlmacenSucursalComponent;
  let fixture: ComponentFixture<DetalleAlmacenSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleAlmacenSucursalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAlmacenSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
