import {  Component } from '@angular/core';
import { Firestore } from 'firebase/firestore';
import { Juegos } from 'src/app/Modelos/juegos';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { JuegosService } from 'src/app/Servicios/juegos.service';
import { MensajeService } from 'src/app/Servicios/mensaje.service';


@Component({
  selector: 'app-lista-juego',
  templateUrl: './lista-juego.component.html',
  styleUrls: ['./lista-juego.component.css']
})
export class ListaJuegoComponent {

  constructor(private servicioJuegos: JuegosService,
     private servicioFirebase: FirebaseService) {}

  mensaje?: string;
  juegos: Juegos[] = [];
  

  ngOnInit() {
    this.servicioJuegos.listarJuego().subscribe(res => this.juegos = res);
  }

  confirmarEliminar(juego: Juegos) {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar el juego con ID ${juego.id}?`);
    if (confirmacion) {
      this.eliminarJuego(juego);
    }
  }
  eliminarJuego(juego: Juegos) {
    this.servicioJuegos.eliminarJuego(juego, "juegos");
  }
 
}
