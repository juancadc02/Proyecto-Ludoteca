import { Component } from '@angular/core';
import { Alquiler } from 'src/app/Modelos/alquiler';
import { AlquilerService } from 'src/app/Servicios/alquiler.service';

@Component({
  selector: 'app-lista-alquiler',
  templateUrl: './lista-alquiler.component.html',
  styleUrls: ['./lista-alquiler.component.css']
})
export class ListaAlquilerComponent {

  constructor(private servicioAlquiler: AlquilerService){}

  alquileres:Alquiler[]=[];
  ngOnInit() {
    this.servicioAlquiler.listarAlquiler().subscribe(res => this.alquileres = res);
  }
  confirmarEliminar(alquiler: Alquiler) {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar el usuario con correo ${alquiler.id}?`);
    if (confirmacion) {
      this.eliminarUsuario(alquiler);
    }
  }
  eliminarUsuario(alquiler: Alquiler) {
    this.servicioAlquiler.eliminarAlquiler(alquiler, "alquileres");
  }
}
