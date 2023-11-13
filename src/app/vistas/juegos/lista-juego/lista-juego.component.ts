import { Component } from '@angular/core';
import { Juegos } from 'src/app/Modelos/juegos';
import { JuegosService } from 'src/app/Servicios/juegos.service';

@Component({
  selector: 'app-lista-juego',
  templateUrl: './lista-juego.component.html',
  styleUrls: ['./lista-juego.component.css']
})
export class ListaJuegoComponent {

  constructor(private servicioJuegos: JuegosService){}


  juegos :Juegos[]=[];
  
  ngOnInit(){
    this.servicioJuegos.listarJuego().subscribe(res=> this.juegos = res)
  }
}
