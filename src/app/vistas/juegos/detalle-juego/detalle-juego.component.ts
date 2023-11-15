import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Juegos } from 'src/app/Modelos/juegos';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { JuegosService } from 'src/app/Servicios/juegos.service';


@Component({
  selector: 'app-detalle-juego',
  templateUrl: './detalle-juego.component.html',
  styleUrls: ['./detalle-juego.component.css']
})
export class DetalleJuegoComponent {

  juegoForm: FormGroup;
  juegos:Juegos={id:"", idJuego:"",nombreJuego:"",codigoReferenciaJuego:"",precioJuego:0};
  id: string = "";
  buttonText: string = "Agregar juego"; //Para cambiar el texto al boton.

  constructor(private fb: FormBuilder, private servicioJuegos: JuegosService,
    private route :ActivatedRoute,private servicioFirebase:FirebaseService ) {
    this.juegoForm = this.fb.group({
      idJuego: ['', Validators.required],
      nombreJuego: ['', Validators.required],
      codigoReferenciaJuego: ['', Validators.required],
      precioJuego: ['', Validators.required],
    });
  }

  ngOnInit(){
    if(this.route.snapshot.paramMap.get("id")){
      this.id = this.route.snapshot.paramMap.get("id")!;
      this.servicioFirebase.getFireBasePorId('juegos',this.id).subscribe(
        (res: any) => this.juegos = res);
    }
  }

  enviaDatos(){
    if(this.id != ""){
      this.modificarJuego();
      this.buttonText = "Modificar Juego"; 
    }
    else{
      this.agregarJuego();
      this.buttonText = "Agregar Juego"; 
    }
  }
 
  modificarJuego()
  {
    this.servicioJuegos.modificarJuego(this.juegos,'juegos', this.id!).
    then(()=>console.log("Se guardo correctamente")).
    catch(()=>console.log("No se guardo"));
  }

  agregarJuego() {
    if (this.juegoForm.valid) {
      const nuevoJuego = this.juegoForm.value;
      this.servicioJuegos.agregarJuego(nuevoJuego)
        .then(() => {
          console.log('Juego agregado correctamente');
          this.juegoForm.reset();
        })
        .catch(error => {
          console.error('Error al agregar el juego:', error);
        });
    }
  
  }

}

