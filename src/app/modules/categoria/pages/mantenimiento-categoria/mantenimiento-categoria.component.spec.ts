import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoCategoriaComponent } from './mantenimiento-categoria.component';

describe('MantenimientoCategoriaComponent', () => {
  let component: MantenimientoCategoriaComponent;
  let fixture: ComponentFixture<MantenimientoCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
