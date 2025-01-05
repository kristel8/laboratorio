import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoClienteComponent } from './mantenimiento-cliente.component';

describe('MantenimientoClienteComponent', () => {
  let component: MantenimientoClienteComponent;
  let fixture: ComponentFixture<MantenimientoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
