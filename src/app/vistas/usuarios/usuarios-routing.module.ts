import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { UsuariosComponent } from './usuarios.component';

const routes :Routes=[
  {path:'',component:UsuariosComponent},
  {path:'usuarios/nuevo',component:DetalleUsuarioComponent},
  {path:'usuarios/:id',component:DetalleUsuarioComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class UsuariosRoutingModule { }
