import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoCajaComponent } from './movimiento-caja.component';

describe('MovimientoCajaComponent', () => {
  let component: MovimientoCajaComponent;
  let fixture: ComponentFixture<MovimientoCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientoCajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
