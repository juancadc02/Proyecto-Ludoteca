import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alquiler } from 'src/app/Modelos/alquiler';
import { Usuario } from 'src/app/Modelos/usuarios';
import { AlquilerService } from 'src/app/Servicios/alquiler.service';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { MensajeService } from 'src/app/Servicios/mensaje.service';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';

@Component({
  selector: 'app-detalle-alquiler',
  templateUrl: './detalle-alquiler.component.html',
  styleUrls: ['./detalle-alquiler.component.css']
})
export class DetalleAlquilerComponent {

  alquilerForm: FormGroup;
  alquiler: Alquiler = { usuarioId: "", juegoId: "", fechaAlquiler: new Date(), fechaDevolucionPrevista: new Date(), costoAlquiler: 0 };
  id: string = "";
  buttonText: string = "Agregar alquiler";
  mensaje?: string;
  textoTitulo: string = 'Añadir Alquiler';
  usuarios: Usuario[] = [];
  
  constructor(
    private servicioMensaje: MensajeService,
    private fb: FormBuilder,
    private servicioAlquiler: AlquilerService,
    private servicioUsuario:UsuariosService,
    private route: ActivatedRoute,
    private router: Router,
    private firebase:FirebaseService
  ) {
    this.alquilerForm = this.fb.group({
      usuarioId: ['', Validators.required],
      juegoId: ['', Validators.required],
      // La fecha de alquiler se establece automáticamente en la fecha actual
      fechaAlquiler: [new Date(), Validators.required],
      // La fecha de devolución prevista se establece automáticamente en 7 días después de la fecha actual
      fechaDevolucionPrevista: [this.getFechaDevolucionPrevista(), Validators.required],
      costoAlquiler: ['', Validators.required],
    });
  }

  // Función auxiliar para obtener la fecha de devolución prevista (7 días después de la fecha actual)
  private getFechaDevolucionPrevista(): Date {
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() + 7);
    return fechaActual;
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get("id")) {
      this.textoTitulo = 'Modificar Alquiler';
      this.id = this.route.snapshot.paramMap.get("id")!;
      this.buttonText = "Modificar alquiler";
      this.firebase.getFireBasePorId('alquileres',this.id).subscribe(
        (res: Alquiler) => this.alquiler = res
      );
      this.servicioUsuario.getFireBase('usuarios')
      .subscribe(res => this.usuarios = res);
     
    }

    this.servicioMensaje.mensaje$.subscribe((mensaje) => {
      if (mensaje) {
        this.mensaje = mensaje;
      }
    });
  }

  enviarDatos() {
    if (this.id) {
      this.modificarAlquiler();
    } else {
      this.agregarAlquiler();
    }
  }

  agregarAlquiler() {
    if (this.alquilerForm.valid) {
      const nuevoAlquiler = this.alquilerForm.value;
      this.servicioAlquiler.agregarAlquiler(nuevoAlquiler)
        .then(() => {
          console.log('Alquiler agregado correctamente');
          this.alquilerForm.reset();
          this.servicioMensaje.enviarMensaje('Alquiler añadido correctamente. Redirigiendo a listado de alquileres...');
          setTimeout(() => {
            this.router.navigate(['/alquileres']);
          }, 2000);
        })
        .catch(error => {
          console.error('Error al agregar el alquiler:', error);
        });
    }
  }
  modificarAlquiler(){

  }
  
  
  
}

