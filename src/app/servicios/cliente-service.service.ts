import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { EntidadProducto } from '../modelos/entidad-producto';
import { EntidadCategorias } from '../modelos/entidad-categorias';
import { EntidadUsuario } from '../modelos/entidad-usuario';
import { EntidadSuscriptor } from '../modelos/entidad-suscriptor';
import { EntidadContacto } from '../modelos/entidad-contacto';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  url:string="https://back-realstore.herokuapp.com";
  constructor(private http:HttpClient) {}

  ListarProductos(){
    return this.http.get<EntidadProducto[]>(this.url+"/listarproductos");
  }
  ListarProductosTop(){
    return this.http.get<EntidadProducto[]>(this.url+"/listarproductostop");
  }
  ListarProductosCategoria(cod:number){
    return this.http.get<EntidadProducto[]>(this.url+"/Listarproductoscategoria/"+cod);
  }
  ListarCategorias(){
    return this.http.get<EntidadCategorias[]>(this.url+"/listarcategorias");
  }
  buscarproducto(cod:number){
    return this.http.get<EntidadProducto[]>(this.url+"/buscarproducto/"+cod);
  }
  ListarPerfilUsuario(dni:number){
    return this.http.get<EntidadUsuario[]>(this.url+"/listarusuario/"+dni);
  }
  ActualizarDatosUsuario(dni:number,entidad:EntidadUsuario){
    return this.http.put<EntidadUsuario[]>(this.url+"/actualizardatos/"+dni,entidad);
  }

  RegistrarSuscriptor(entidad:EntidadSuscriptor){
    return this.http.post<EntidadSuscriptor>(this.url+"/registrarsuscriptor", entidad);
  }

  RegistrarContacto(entidad:EntidadContacto){
    return this.http.post<EntidadContacto>(this.url+"/registrarcontacto", entidad);
  }
}
