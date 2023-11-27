import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenerdorAlquilerComponent } from './contenerdor-alquiler.component';

describe('ContenerdorAlquilerComponent', () => {
  let component: ContenerdorAlquilerComponent;
  let fixture: ComponentFixture<ContenerdorAlquilerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContenerdorAlquilerComponent]
    });
    fixture = TestBed.createComponent(ContenerdorAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
