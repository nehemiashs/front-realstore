import { Component, OnInit } from '@angular/core';
import { EntidadUsuario } from 'src/app/modelos/entidad-usuario';
import { AdminServiceService } from 'src/app/servicios/admin-service.service';

declare var $:any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  constructor(private servicio:AdminServiceService) { }

  Usuarios:EntidadUsuario[]=[];
  Roles:EntidadUsuario = new EntidadUsuario();

  Usuario:any[] =[];
  Administrador:boolean = false;
  User:boolean = false;
  SinVerificar:boolean = false;
  ngOnInit(): void {

    let datos = localStorage.getItem('user');
    if(datos){
      this.Usuario = JSON.parse(datos);
      for(let ele of this.Usuario){
        if(ele.codigo == 2){
          this.User = true;
        }
        if(ele.codigo == 3){
          this.Administrador = true;
        }
      }
    }

    this.servicio.ListarUsuarios().subscribe(data =>{
      this.Usuarios=data;
      });
  }

  Gestionar(dni:any, e:any){
    this.Roles.codigo = e.target.value;
    this.Roles.dni = dni;
    for(let element of this.Usuarios){
      if(element.dni == dni){
        this.Roles.nombre=element.nombre;
        this.Roles.apellido=element.apellido;
        this.Roles.email=element.email;
        this.Roles.fech_nacimiento=element.fech_nacimiento;
        this.Roles.genero=element.genero;
        this.Roles.password=element.password;
        this.Roles.telefono=element.telefono;
        this.Roles.eliminado=element.eliminado;
      }
    }
    this.servicio.AsignarRol(this.Roles).subscribe(data =>{
      if(data)
      this.ngOnInit()
    })
  }
  EliminarUsuario(dni:any){
    this.servicio.EliminarUsuario(dni).subscribe(data =>{
      if(data)
      this.ngOnInit()
    })

  }
}
