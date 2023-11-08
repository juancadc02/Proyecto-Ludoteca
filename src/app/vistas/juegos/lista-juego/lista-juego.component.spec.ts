import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaJuegoComponent } from './lista-juego.component';

describe('ListaJuegoComponent', () => {
  let component: ListaJuegoComponent;
  let fixture: ComponentFixture<ListaJuegoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaJuegoComponent]
    });
    fixture = TestBed.createComponent(ListaJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
