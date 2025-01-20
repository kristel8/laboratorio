import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoPacienteComponent } from './mantenimiento-paciente.component';

describe('MantenimientoPacienteComponent', () => {
  let component: MantenimientoPacienteComponent;
  let fixture: ComponentFixture<MantenimientoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
