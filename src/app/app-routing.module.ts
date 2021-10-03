import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './componentes/administracion/administracion.component';
import { AutenticationComponent } from './componentes/autentication/autentication.component';
import { CarritoComprasComponent } from './componentes/carrito-compras/carrito-compras.component';
import { CatalogoProductoComponent } from './componentes/catalogo-producto/catalogo-producto.component';
import { DetalleProductoComponent } from './componentes/detalle-producto/detalle-producto.component';
import { HistorialComponent } from './componentes/historial/historial.component';
import { HOMEComponent } from './componentes/home/home.component';
import { InformesComponent } from './componentes/informes/informes.component';
import { MapsComponent } from './componentes/maps/maps.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';


const routes: Routes = [
  {
    path:"",
    component:HOMEComponent
  },{
    path:"registro",
    component:RegistroUsuarioComponent
  },
  {
    path:"autentication",
    component:AutenticationComponent
  },
  {
    path:"detalle",
    component:DetalleProductoComponent
  },
  {
    path:"catalogo",
    component:CatalogoProductoComponent
  },
  {
    path:"carrito",
    component:CarritoComprasComponent
  },
  {
    path:"administracion",
    component:AdministracionComponent
  },
  {
    path:"perfil",
    component:PerfilComponent
  },
  {
    path:"historial",
    component:HistorialComponent
  },
  {
    path:"usuarios",
    component:UsuariosComponent
  },
  {
    path:"productos",
    component:ProductosComponent
  },
  {
    path:"informes",
    component:InformesComponent
  },
  {
    path:"ubicanos",
    component:MapsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
