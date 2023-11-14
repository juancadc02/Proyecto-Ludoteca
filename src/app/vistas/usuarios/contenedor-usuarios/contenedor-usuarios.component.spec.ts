import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorUsuariosComponent } from './contenedor-usuarios.component';

describe('ContenedorUsuariosComponent', () => {
  let component: ContenedorUsuariosComponent;
  let fixture: ComponentFixture<ContenedorUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContenedorUsuariosComponent]
    });
    fixture = TestBed.createComponent(ContenedorUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
