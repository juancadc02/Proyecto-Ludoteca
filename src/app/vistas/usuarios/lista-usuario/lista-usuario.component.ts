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
  confirmarEliminar(usuario: Usuario) {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar el usuario con correo ${usuario.correoUsuario}?`);
    if (confirmacion) {
      this.eliminarUsuario(usuario);
    }
  }
  eliminarUsuario(usuario: Usuario) {
    this.servicioUsuarios.eliminarJuego(usuario, "usuarios");
  }
}
