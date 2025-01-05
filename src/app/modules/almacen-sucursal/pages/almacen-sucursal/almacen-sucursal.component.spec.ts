import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenSucursalComponent } from './almacen-sucursal.component';

describe('AlmacenSucursalComponent', () => {
  let component: AlmacenSucursalComponent;
  let fixture: ComponentFixture<AlmacenSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlmacenSucursalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
