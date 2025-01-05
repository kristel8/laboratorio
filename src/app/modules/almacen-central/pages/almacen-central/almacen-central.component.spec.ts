import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenCentralComponent } from './almacen-central.component';

describe('AlmacenCentralComponent', () => {
  let component: AlmacenCentralComponent;
  let fixture: ComponentFixture<AlmacenCentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlmacenCentralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
