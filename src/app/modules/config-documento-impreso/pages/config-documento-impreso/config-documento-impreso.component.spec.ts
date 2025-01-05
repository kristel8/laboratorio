import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigDocumentoImpresoComponent } from './config-documento-impreso.component';

describe('ConfigDocumentoImpresoComponent', () => {
  let component: ConfigDocumentoImpresoComponent;
  let fixture: ComponentFixture<ConfigDocumentoImpresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigDocumentoImpresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigDocumentoImpresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
