import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoConfigDocumentoImpresoComponent } from './mantenimiento-config-documento-impreso.component';

describe('MantenimientoConfigDocumentoImpresoComponent', () => {
  let component: MantenimientoConfigDocumentoImpresoComponent;
  let fixture: ComponentFixture<MantenimientoConfigDocumentoImpresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoConfigDocumentoImpresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoConfigDocumentoImpresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
