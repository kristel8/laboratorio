import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenCajaComponent } from './resumen-caja.component';

describe('ResumenCajaComponent', () => {
  let component: ResumenCajaComponent;
  let fixture: ComponentFixture<ResumenCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenCajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
