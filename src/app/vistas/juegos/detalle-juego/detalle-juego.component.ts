import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JuegosService } from 'src/app/Servicios/juegos.service';


@Component({
  selector: 'app-detalle-juego',
  templateUrl: './detalle-juego.component.html',
  styleUrls: ['./detalle-juego.component.css']
})
export class DetalleJuegoComponent {

  juegoForm: FormGroup;
  
  constructor(private fb: FormBuilder, private servicioJuegos: JuegosService) {
    this.juegoForm = this.fb.group({
      idJuego: ['', Validators.required],
      nombreJuego: ['', Validators.required],
      codigoReferenciaJuego: ['', Validators.required],
      precioJuego: ['', Validators.required],
    });
  }

  agregarJuego() {
    if (this.juegoForm.valid) {
      const nuevoJuego = this.juegoForm.value;
      this.servicioJuegos.agregarJuego(nuevoJuego)
        .then(() => {
          console.log('Juego agregado correctamente');
          this.juegoForm.reset();
        })
        .catch(error => {
          console.error('Error al agregar el juego:', error);
        });
    }
  
  }

}

