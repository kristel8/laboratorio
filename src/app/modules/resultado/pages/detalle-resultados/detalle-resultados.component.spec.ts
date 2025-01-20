import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleResultadosComponent } from './detalle-resultados.component';

describe('DetalleResultadosComponent', () => {
  let component: DetalleResultadosComponent;
  let fixture: ComponentFixture<DetalleResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleResultadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
