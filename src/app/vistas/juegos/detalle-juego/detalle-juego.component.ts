import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Juegos } from 'src/app/Modelos/juegos';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { JuegosService } from 'src/app/Servicios/juegos.service';
import { MensajeService } from 'src/app/Servicios/mensaje.service';


@Component({
  selector: 'app-detalle-juego',
  templateUrl: './detalle-juego.component.html',
  styleUrls: ['./detalle-juego.component.css']
})
export class DetalleJuegoComponent {


  juegoForm: FormGroup;
  juegos: Juegos = { id: "", nombreJuego: "", codigoReferenciaJuego: "", precioJuego: 0 };
  id: string = "";
  buttonText: string = "Agregar juego"; //Para cambiar el texto al boton.
  mensaje?: string;

  constructor(private servicioMensaje: MensajeService, private fb: FormBuilder, private servicioJuegos: JuegosService,
    private route: ActivatedRoute, private servicioFirebase: FirebaseService, private router: Router) {
    this.juegoForm = this.fb.group({
      nombreJuego: ['', Validators.required],
      codigoReferenciaJuego: ['', Validators.required],
      precioJuego: ['', Validators.required],
    });

  }


  ngOnInit() {
    if (this.route.snapshot.paramMap.get("id")) {
      this.id = this.route.snapshot.paramMap.get("id")!;
      this.buttonText = "Modificar juego";
      this.servicioFirebase.getFireBasePorId('juegos', this.id).subscribe(
        (res: any) => this.juegos = res);
    }
    this.servicioMensaje.mensaje$.subscribe((mensaje) => {
      if (mensaje) {
        this.mensaje = mensaje;
      }
    });
  }

  enviaDatos() {
    if (this.id) {
      this.modificarJuego();
    }
    else {
      this.agregarJuego();
    }
  }
  modificarJuego() {
    this.servicioJuegos.modificarJuego(this.juegos, 'juegos', this.id!).
      then(() => console.log("Se guardo correctamente")).
      catch(() => console.log("No se guardo"));
  }

  agregarJuego() {
    if (this.juegoForm.valid) {
      const nuevoJuego = this.juegoForm.value;
      this.servicioJuegos.agregarJuego(nuevoJuego)
        .then(() => {
          console.log('Juego agregado correctamente');
          this.juegoForm.reset();
          this.servicioMensaje.enviarMensaje('Juego añadido correctamente.Redirigiendo a listado de juegos ...');
          //Redirigimos al listado de juegos 2 segundos despues de añadirlo.
          setTimeout(() => {
            // Redirigir a otro sitio
            this.router.navigate(['/juegos']);
          }, 2000)
        })
        .catch(error => {
          console.error('Error al agregar el juego:', error);
        });
    }
  }

}

