import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoCompraComponent } from './mantenimiento-compra.component';

describe('MantenimientoCompraComponent', () => {
  let component: MantenimientoCompraComponent;
  let fixture: ComponentFixture<MantenimientoCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
