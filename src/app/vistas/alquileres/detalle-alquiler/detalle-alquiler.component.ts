import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alquiler } from 'src/app/Modelos/alquiler';
import { Juegos } from 'src/app/Modelos/juegos';
import { Usuario } from 'src/app/Modelos/usuarios';
import { AlquilerService } from 'src/app/Servicios/alquiler.service';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { JuegosService } from 'src/app/Servicios/juegos.service';
import { MensajeService } from 'src/app/Servicios/mensaje.service';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';

@Component({
  selector: 'app-detalle-alquiler',
  templateUrl: './detalle-alquiler.component.html',
  styleUrls: ['./detalle-alquiler.component.css']
})
export class DetalleAlquilerComponent {

  alquilerForm: FormGroup;
  alquiler: Alquiler = { nombreUsuario: "", nombreJuego: "", fechaAlquiler: new Date(), fechaDevolucionPrevista: new Date(), costoAlquiler: 0, totalDiasAlquiler: 0 ,alquilerDevuelto:false};
  id: string = "";
  nombreUsuario?: string;
  nombreJuego?: string;
  buttonText: string = "Agregar alquiler";
  mensaje?: string;
  textoTitulo: string = 'Añadir Alquiler';
  usuarios: Usuario[] = [];
  juegos: Juegos[] = [];
  diferenciaEnDias?: number;
  diferenciaDiasPrecio?: number ;


 

  constructor(
    private servicioMensaje: MensajeService,
    private fb: FormBuilder,
    private servicioAlquiler: AlquilerService,
    private servicioUsuario: UsuariosService,
    private route: ActivatedRoute,
    private router: Router,
    private firebase: FirebaseService,
    private servicioJuego: JuegosService,
  ) {
    this.alquilerForm = this.fb.group({
      nombreJuego: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      fechaAlquiler: [new Date().toISOString().split('T')[0], Validators.required],
      fechaDevolucionPrevista: [null, Validators.required],
      costoAlquiler: [null, Validators.required],
      alquilerDevuelto: [null, Validators.required]
    });

    // Verificar si alquilerForm no es nulo antes de suscribirse a los cambios
    if (this.alquilerForm) {
      const fechaDevolucionPrevistaControl = this.alquilerForm.get('fechaDevolucionPrevista');

      if (fechaDevolucionPrevistaControl) {
        fechaDevolucionPrevistaControl.valueChanges.subscribe(() => {
          this.calcularDiferenciaDeDias();
        });
        
      }
      
    }
  }

  ngOnInit() {
    
    // Cargamos los juegos disponibles y los usuarios.
    this.servicioUsuario.listarUsuario().subscribe(res => this.usuarios = res);
    this.servicioJuego.listarJuego().subscribe(res => this.juegos = res);

    // Comprobamos si estamos añadiendo o modificando.
    if (this.route.snapshot.paramMap.get("id")) {
      this.textoTitulo = 'Modificar Alquiler';
      this.id = this.route.snapshot.paramMap.get("id")!;
      this.buttonText = "Modificar alquiler";
      this.firebase.getFireBasePorId('alquileres', this.id).subscribe(
        (res: Alquiler) => this.alquiler = res
      );
    }

    // Para mostrar el mensaje una vez añadido el alquiler
    this.servicioMensaje.mensaje$.subscribe((mensaje) => {
      if (mensaje) {
        this.mensaje = mensaje;
      }
    });
    
    
  }

  enviaDatos() {
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
          this.servicioMensaje.enviarMensaje('Alquiler añadido correctamente. Redirigiendo a listado de alquileres ...');
            //Redirigimos al listado de juegos 2 segundos despues de añadirlo.
            setTimeout(() => {
              // Redirigir a otro sitio
              this.router.navigate(['/alquiler']);
            }, 2000)
          })
          .catch(error => {
            console.error('Error al agregar el alquiler:', error);
          });
      }
    }

  modificarAlquiler() {
    // Actualizar el objeto alquiler con el nuevo precio calculado
    this.alquiler.costoAlquiler = this.diferenciaDiasPrecio || 0;

    this.servicioAlquiler.modificarAlquiler(this.alquiler, 'alquileres', this.id!)
        .then(() => console.log("Se guardó correctamente"))
        .catch(() => console.log("No se guardó"));

    this.servicioMensaje.enviarMensaje('Alquiler modificado correctamente. Redirigiendo a listado de alquileres ...');
     //Redirigimos al listado de juegos 2 segundos despues de añadirlo.
     setTimeout(() => {
      // Redirigir a otro sitio
      this.router.navigate(['/alquiler']);
    }, 2000)
}

  calcularDiferenciaDeDias(): number {
    if (this.alquilerForm) {
      const fechaIntroducida = new Date(this.alquilerForm.value.fechaDevolucionPrevista);
      const fechaActual = new Date();
  
      // Calcula la diferencia en milisegundos
      const diferenciaEnMilisegundos = fechaIntroducida.getTime() - fechaActual.getTime();
  
      // Convierte la diferencia a días
      this.diferenciaEnDias = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
  
      // Multiplica la diferencia por el precio del juego seleccionado
      const precioJuego = this.juegos.find(juego => juego.nombreJuego === this.alquilerForm.value.nombreJuego)?.precioJuego || 0;
      this.diferenciaDiasPrecio = this.diferenciaEnDias * precioJuego;
  
      return this.diferenciaEnDias;
    }
  
    return 0;
  }
  
}
