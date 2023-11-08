import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './vistas/usuarios/usuarios.component';
import { JuegosComponent } from './vistas/juegos/juegos.component';
import { AlquileresComponent } from './vistas/alquileres/alquileres.component';
import { PaginaInicioComponent } from './vistas/pagina-inicio/pagina-inicio.component';

const routes: Routes = [
  {path:'',component:PaginaInicioComponent},
  {path:'juegos',component:JuegosComponent},
  {path:'alquiler',component:AlquileresComponent},
  {path:'usuarios',component:UsuariosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
