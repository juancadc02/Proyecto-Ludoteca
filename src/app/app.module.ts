import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
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
    PaginaInicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
