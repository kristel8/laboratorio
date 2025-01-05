import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionesComponent } from './recepciones.component';

describe('RecepcionesComponent', () => {
  let component: RecepcionesComponent;
  let fixture: ComponentFixture<RecepcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepcionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
