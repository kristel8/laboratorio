import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoSubCategoriaComponent } from './mantenimiento-sub-categoria.component';

describe('MantenimientoSubCategoriaComponent', () => {
  let component: MantenimientoSubCategoriaComponent;
  let fixture: ComponentFixture<MantenimientoSubCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoSubCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoSubCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
