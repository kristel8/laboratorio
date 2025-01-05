import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoVentaComponent } from './mantenimiento-venta.component';

describe('MantenimientoVentaComponent', () => {
  let component: MantenimientoVentaComponent;
  let fixture: ComponentFixture<MantenimientoVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
