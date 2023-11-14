import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.development';
import { JuegosComponent } from './vistas/juegos/juegos.component';
import { UsuariosComponent } from './vistas/usuarios/usuarios.component';
import { AlquileresComponent } from './vistas/alquileres/alquileres.component';
import { MenuComponent } from './core/menu/menu.component';
import { ContenedorComponent } from './vistas/juegos/contenedor/contenedor.component';
import { ListaJuegoComponent } from './vistas/juegos/lista-juego/lista-juego.component';
import { DetalleJuegoComponent } from './vistas/juegos/detalle-juego/detalle-juego.component';
import { PaginaInicioComponent } from './vistas/pagina-inicio/pagina-inicio.component';
import { DetalleUsuarioComponent } from './vistas/usuarios/detalle-usuario/detalle-usuario.component';
import { ListaUsuarioComponent } from './vistas/usuarios/lista-usuario/lista-usuario.component';
import { ContenedorUsuariosComponent } from './vistas/usuarios/contenedor-usuarios/contenedor-usuarios.component';
@NgModule({
  declarations: [
    AppComponent,
    JuegosComponent,
    UsuariosComponent,
    AlquileresComponent,
    MenuComponent,
    ContenedorComponent,
    ListaJuegoComponent,
    DetalleJuegoComponent,
    PaginaInicioComponent,
    DetalleUsuarioComponent,
    ListaUsuarioComponent,
    ContenedorUsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"ludoteca-c3fa3","appId":"1:646573847747:web:0fdac18a3c6aa53b9b5e76","storageBucket":"ludoteca-c3fa3.appspot.com","apiKey":"AIzaSyCMNxGux5a20kzdZWfG5AqsG1SyReyNrNo","authDomain":"ludoteca-c3fa3.firebaseapp.com","messagingSenderId":"646573847747","measurementId":"G-C6MTJ85F4P"}))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
