import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarResultadosComponent } from './agregar-resultados.component';

describe('AgregarResultadosComponent', () => {
  let component: AgregarResultadosComponent;
  let fixture: ComponentFixture<AgregarResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarResultadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
