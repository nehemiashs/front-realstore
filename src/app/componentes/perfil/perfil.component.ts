import { Component, OnInit } from '@angular/core';
import { EntidadUsuario } from 'src/app/modelos/entidad-usuario';
import { ClienteServiceService } from 'src/app/servicios/cliente-service.service';


declare var $:any;
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(private servicio:ClienteServiceService) { }

  Usuario:EntidadUsuario[]=[];
  Data:EntidadUsuario[]=[];

  Administrador:boolean = false;
  User:boolean = false;
  SinVerificar:boolean = false;
  ngOnInit(): void {
    let user:any=localStorage.getItem("user")
    let USUARIO=JSON.parse(user);
    this.Data = USUARIO;
    for(let ele of this.Data){
      if(ele.codigo == 2){
        this.User = true;
      }
      if(ele.codigo == 3){
        this.Administrador = true;
      }
    }

    this.servicio.ListarPerfilUsuario(this.Data[0]['dni']).subscribe(data =>{
      this.Usuario = data;
      });
  }
  image(){
    function readFile(input:any) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e:any) {
            var profile:any = document.getElementById('profile');
            profile.src = e.target.result
            $('#data-image').val(e.target.result);
          };
          reader.readAsDataURL(input.files[0]);
        }
    }

    var fileUpload:any = document.getElementById('file');
    fileUpload.onchange = function (e:any) {
        readFile(e.srcElement);
    };

  }

  DataUsuario:EntidadUsuario = new EntidadUsuario();
  ActualizarDatos(dni:any){
    this.DataUsuario.dni = dni;
    this.DataUsuario.nombre = $('#nombre').val();
    this.DataUsuario.apellido = $('#apellido').val();
    this.DataUsuario.email = $('#email').val();
    this.DataUsuario.image = $('#data-image').val();
    this.DataUsuario.password = $('#password2').val();
    this.DataUsuario.genero = $('#genero').val();
    this.DataUsuario.fech_nacimiento = $('#nacimiento').val();
    this.DataUsuario.telefono = $('#telefono').val();
    this.DataUsuario.codigo = $('#rol').val();

    this.servicio.ActualizarDatosUsuario(dni,this.DataUsuario).subscribe(data =>{
      this.Usuario = data;
      this.ngOnInit()
    });

  }
}
