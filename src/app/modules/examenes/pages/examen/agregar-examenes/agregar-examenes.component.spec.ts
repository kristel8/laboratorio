import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarExamenesComponent } from './agregar-examenes.component';

describe('AgregarExamenesComponent', () => {
  let component: AgregarExamenesComponent;
  let fixture: ComponentFixture<AgregarExamenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarExamenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
