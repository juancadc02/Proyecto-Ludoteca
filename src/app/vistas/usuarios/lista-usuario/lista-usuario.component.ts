import { Component } from '@angular/core';
import { Usuario } from 'src/app/Modelos/usuarios';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent {

  constructor(private servicioUsuarios: UsuariosService){}


  usuarios :Usuario[]=[];
  
  ngOnInit(){
    this.servicioUsuarios.listarUsuario().subscribe(res=> this.usuarios = res)
  }
}
