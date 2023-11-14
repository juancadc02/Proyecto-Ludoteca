import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent {

  usuarioForm: FormGroup;


  constructor(private fb: FormBuilder, private servicioUsuariop: UsuariosService) {
    this.usuarioForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      contraseñaUsuario: ['', Validators.required],
      correoUsuario: ['', Validators.required],
    });
  }

  agregarUsuario() {
    if (this.usuarioForm.valid) {
      const nuevoUsuario= this.usuarioForm.value;
      this.servicioUsuariop.agregarUsuario(nuevoUsuario)
        .then(() => {
          console.log('Usuario agregado correctamente');
          this.usuarioForm.reset();
        })
        .catch(error => {
          console.error('Error al agregar el usuario:', error);
        });
    }
  
  }
  
}
