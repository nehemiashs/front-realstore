import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntidadUsuario } from '../modelos/entidad-usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticationServiceService {

  url:string ="https://back-realstore.herokuapp.com"
  constructor(private http:HttpClient) { }

  login(email:String, password:String){
    return this.http.get<EntidadUsuario>(this.url+"/autentication/"+ email +"/"+ password);
  }

  registrar(entidad:EntidadUsuario){ //console.log(entidad.nombre);
    return this.http.post<EntidadUsuario[]>(this.url+"/registrarusuario", entidad);
  }
}
