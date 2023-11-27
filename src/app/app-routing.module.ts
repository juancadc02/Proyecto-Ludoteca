import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './vistas/juegos/juegos.component';
import { AlquileresComponent } from './vistas/alquileres/alquileres.component';
import { PaginaInicioComponent } from './vistas/pagina-inicio/pagina-inicio.component';
import { DetalleJuegoComponent } from './vistas/juegos/detalle-juego/detalle-juego.component';
import { DetalleAlquilerComponent } from './vistas/alquileres/detalle-alquiler/detalle-alquiler.component';

const routes: Routes = [
  {path:'',component:PaginaInicioComponent},
  {path:'juegos',component:JuegosComponent},
  {path:'juegos/nuevo',component:DetalleJuegoComponent},
  {path:'juegos/:id',component:DetalleJuegoComponent},
  {path:'alquiler',component:AlquileresComponent},
  {path:'alquiler/nuevo',component:DetalleAlquilerComponent},
  {path:'usuarios', loadChildren : ()  => import('./vistas/usuarios/usuarios.module').then(m=>m.UsuariosModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
