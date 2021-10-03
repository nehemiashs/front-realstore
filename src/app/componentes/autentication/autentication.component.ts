import { Component, OnInit } from '@angular/core';
import { EntidadContacto } from 'src/app/modelos/entidad-contacto';
import { EntidadSuscriptor } from 'src/app/modelos/entidad-suscriptor';
import { EntidadUsuario } from 'src/app/modelos/entidad-usuario';
import { AutenticationServiceService } from 'src/app/servicios/autentication-service.service';
import { ClienteServiceService } from 'src/app/servicios/cliente-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autentication',
  templateUrl: './autentication.component.html',
  styleUrls: ['./autentication.component.scss']
})
export class AutenticationComponent implements OnInit {

  Datos:any[] = [];
  Usuario:EntidadUsuario = new EntidadUsuario();
  Suscriptor:EntidadSuscriptor = new EntidadSuscriptor();
  Contacto:EntidadContacto = new EntidadContacto();
  DataUsario:EntidadUsuario[] = [];
  User:boolean = false;
  constructor(private serv:ClienteServiceService, private servicio:AutenticationServiceService) { }

  ngOnInit(): void {
    let datos:any = localStorage.getItem('user');
    this.DataUsario = JSON.parse(datos);
    if(datos) this.User = true;

  }
  logForm(value: any) {
    if(this.Suscriptor.email){
      this.serv.RegistrarSuscriptor(this.Suscriptor).subscribe(data =>{
        if(data)
        {
          const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            timer: 3000,
            timerProgressBar: false,
            showConfirmButton: true,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> Bien!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
              '<i class="fa fa-thumbs-down"></i> Cerrar',
            cancelButtonAriaLabel: 'Thumbs down'
          })
          Toast.fire('Success', 'Gracias por suscribirte '+this.Suscriptor.email, 'success');
        }
      })
    }
    console.log(value);
  }

  login(){
    this.servicio.login(this.Usuario.email, this.Usuario.password).subscribe(data =>{
      if(data){
        this.Datos.push(data); //alert(this.Datos.email+' | '+ this.Datos.password);

        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          //timer: 3000,
          timerProgressBar: false,
          showConfirmButton: true,
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Bien!',
          confirmButtonAriaLabel: 'Thumbs up, great!',
          cancelButtonText:
            '<i class="fa fa-thumbs-down"></i> Cerrar',
          cancelButtonAriaLabel: 'Thumbs down'
        })
        Toast.fire('Bienvenido '+this.Datos[0]['nombre']+'!', this.Datos[0]['email'], 'success').then((result) => {
          if (result.isConfirmed) {location.href = 'administracion'}else{this.ngOnInit()}});

      localStorage.setItem('user',JSON.stringify(this.Datos));
      }
      if(!data){
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          showCloseButton: true
        })
        Toast.fire('Credenciales Erroneas', '', 'warning')
      }
    });
  }

  FormContacto(value:any){
    var fecha = new Date();
    var datetime = fecha.getFullYear() + "/" + (fecha.getMonth()+1) + "/" + fecha.getDate() + " "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
    this.Contacto.fecha = datetime;
    if(this.Contacto.asunto && this.Contacto.email){
      this.serv.RegistrarContacto(this.Contacto).subscribe(data =>{
        if(data){
          const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            timer: 3000,
            timerProgressBar: false,
            showConfirmButton: true,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> Bien!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
              '<i class="fa fa-thumbs-down"></i> Cerrar',
            cancelButtonAriaLabel: 'Thumbs down'
          })
          Toast.fire('Contacto', 'Gracias por contactarte '+this.Contacto.nombre, 'success');
        }

      })
    }
  }

}
