import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HOMEComponent } from './componentes/home/home.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetalleProductoComponent } from './componentes/detalle-producto/detalle-producto.component';
import { CatalogoProductoComponent } from './componentes/catalogo-producto/catalogo-producto.component';
import { CarritoComprasComponent } from './componentes/carrito-compras/carrito-compras.component';
import { NgxPayPalModule } from 'ngx-paypal';
// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { AutenticationComponent } from './componentes/autentication/autentication.component';
import { AdministracionComponent } from './componentes/administracion/administracion.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HistorialComponent } from './componentes/historial/historial.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ChartsModule } from 'ng2-charts';
import { InformesComponent } from './componentes/informes/informes.component';
import { MapsComponent } from './componentes/maps/maps.component';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);
@NgModule({
  declarations: [
    AppComponent,
    HOMEComponent,
    DetalleProductoComponent,
    CatalogoProductoComponent,
    CarritoComprasComponent,
    AutenticationComponent,
    AdministracionComponent,
    PerfilComponent,
    HistorialComponent,
    UsuariosComponent,
    ProductosComponent,
    FilterPipe,
    InformesComponent,
    MapsComponent,
    RegistroUsuarioComponent
  ],
  imports: [
    ReactiveFormsModule,
    NgxPayPalModule,
    MdbCheckboxModule,
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
