import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/Modelos/usuarios';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent {

  usuarioForm: FormGroup;
  usuarios:Usuario={id:'',nombreUsuario:'',contra:'',correoUsuario:''};
  id?:string;
  textoTitulo?:string='Añadir Usuario';
  constructor(private route: ActivatedRoute,private fb: FormBuilder, private servicioUsuario: UsuariosService,private servicioFirebase:FirebaseService) {
    this.usuarioForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      contra: ['', Validators.required],
      correoUsuario: ['', Validators.required],
    });
  }

  ngOnInit(){
    if (this.route.snapshot.paramMap.get("id")) {
      this.textoTitulo='Modificar Usuario'
      this.id = this.route.snapshot.paramMap.get("id")!;
      //this.buttonText = "Modificar juego";
      this.servicioFirebase.getFireBasePorId('usuarios', this.id).subscribe(
        (res: any) => this.usuarios = res);
    }
  }
  enviarDatos(){
    if(this.id)
    this.modificarUsuario();
    else
    this.agregarUsuario();

    
  }
  agregarUsuario() {
    if (this.usuarioForm.valid) {
      const nuevoUsuario= this.usuarioForm.value;
      this.servicioUsuario.agregarUsuario(nuevoUsuario)
        .then(() => {
          console.log('Usuario agregado correctamente');
          this.usuarioForm.reset();
        })
        .catch(error => {
          console.error('Error al agregar el usuario:', error);
        });
    }
  
  }

modificarUsuario(){
  this.servicioUsuario.modificarJuego(this.usuarios, 'usuarios', this.id!).
      then(() => console.log("Se guardo correctamente")).
      catch(() => console.log("No se guardo"));
  
  }
  
}
