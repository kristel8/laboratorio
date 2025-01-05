import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioSucursalComponent } from './envio-sucursal.component';

describe('EnvioSucursalComponent', () => {
  let component: EnvioSucursalComponent;
  let fixture: ComponentFixture<EnvioSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvioSucursalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
