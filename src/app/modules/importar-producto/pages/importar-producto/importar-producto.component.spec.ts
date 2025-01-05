import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarProductoComponent } from './importar-producto.component';

describe('ImportarProductoComponent', () => {
  let component: ImportarProductoComponent;
  let fixture: ComponentFixture<ImportarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportarProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
