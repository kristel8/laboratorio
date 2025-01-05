import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoEmpresaComponent } from './mantenimiento-empresa.component';

describe('MantenimientoEmpresaComponent', () => {
  let component: MantenimientoEmpresaComponent;
  let fixture: ComponentFixture<MantenimientoEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
