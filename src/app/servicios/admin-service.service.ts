import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntidadCategorias } from '../modelos/entidad-categorias';
import { EntidadContacto } from '../modelos/entidad-contacto';
import { EntidadDetalleVenta } from '../modelos/entidad-detalle-venta';
import { EntidadDetalleVentaIdCliente } from '../modelos/entidad-detalle-venta-id-cliente';
import { EntidadProducto } from '../modelos/entidad-producto';
import { EntidadProveedor } from '../modelos/entidad-proveedor';
import { EntidadSuscriptor } from '../modelos/entidad-suscriptor';
import { EntidadUsuario } from '../modelos/entidad-usuario';
import { EntidadVentas } from '../modelos/entidad-ventas';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  url:string="https://back-realstore.herokuapp.com";
  constructor(private http:HttpClient) { }

  RegistrarVenta(entidad:EntidadVentas){
    return this.http.post<EntidadVentas[]>(this.url+"/registrarventas", entidad);
  }

  RegistrarDetalleVenta(entidad:any){
    return this.http.post<EntidadVentas[]>(this.url+"/registrardetalleventa", entidad);
  }

  ListarDetalleVenta(){
    return this.http.get<EntidadDetalleVenta[]>(this.url+"/listardetalleventas");
  }

  ListarDetalleVentaGeneral(){
    return this.http.get<EntidadDetalleVentaIdCliente[]>(this.url+"/listardetalleventageneral");
  }

  ActualizarStock(entidad:any){
    return this.http.put<EntidadVentas[]>(this.url+"/actualizarstock", entidad);
  }

  ListarVentasGeneral(){
    return this.http.get<EntidadVentas[]>(this.url+"/listarventas");
  }

  ListarVentas(dni:number){
    return this.http.get<EntidadVentas[]>(this.url+"/listarventas/"+dni);
  }

  ListarVentaIdCliente(idventa:string, fecha:string){
    return this.http.get<EntidadDetalleVentaIdCliente[]>(this.url+"/listardetalleventa/"+idventa+"/"+fecha);
  }

  ListarUsuarios(){
    return this.http.get<EntidadUsuario[]>(this.url+"/listarusuarios");
  }

  AsignarRol(entidad:EntidadUsuario){
    return this.http.put<EntidadUsuario[]>(this.url+"/asignarrol",entidad);
  }
  EliminarUsuario(dni:number){
    return this.http.delete<EntidadUsuario[]>(this.url+"/eliminarusuario/"+dni);
  }

  ListarProveedores(){
    return this.http.get<EntidadProveedor[]>(this.url+"/listarproveedores");
  }

  ListarCategorias(){
    return this.http.get<EntidadCategorias[]>(this.url+"/listarcategorias");
  }

  ListarProductos(){
    return this.http.get<EntidadProducto[]>(this.url+"/listarproductos");
  }

  ListarProductosCategoria(cod:number){
    return this.http.get<EntidadProducto[]>(this.url+"/Listarproductoscategoria/"+cod);
  }

  buscarproducto(codprod:number){
    return this.http.get<EntidadProducto>(this.url+"/buscarproducto/"+codprod);
  }

  ActualizarProducto(codprod:number,entidad:any){
    return this.http.put<EntidadVentas[]>(this.url+"/actualizarproducto/"+ codprod, entidad);
  }

  RegistrarProducto(entidad:EntidadProducto){
    return this.http.post<EntidadProducto[]>(this.url+"/registrarproducto", entidad);
  }

  ListarSuscriptores(){
    return this.http.get<EntidadSuscriptor[]>(this.url+"/listarsuscriptores");
  }

  ListarContactos(){
    return this.http.get<EntidadContacto[]>(this.url+"/listarcontactos");
  }
}
