import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAlmacenCentralComponent } from './detalle-almacen-central.component';

describe('DetalleAlmacenCentralComponent', () => {
  let component: DetalleAlmacenCentralComponent;
  let fixture: ComponentFixture<DetalleAlmacenCentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleAlmacenCentralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAlmacenCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
