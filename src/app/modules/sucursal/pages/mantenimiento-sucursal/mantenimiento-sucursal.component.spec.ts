import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoSucursalComponent } from './mantenimiento-sucursal.component';

describe('MantenimientoSucursalComponent', () => {
  let component: MantenimientoSucursalComponent;
  let fixture: ComponentFixture<MantenimientoSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoSucursalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
