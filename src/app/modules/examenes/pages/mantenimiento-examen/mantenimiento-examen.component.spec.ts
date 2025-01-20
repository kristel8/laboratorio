import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoExamenComponent } from './mantenimiento-examen.component';

describe('MantenimientoExamenComponent', () => {
  let component: MantenimientoExamenComponent;
  let fixture: ComponentFixture<MantenimientoExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
