import { Component } from '@angular/core';
import { EntidadUsuario } from './modelos/entidad-usuario';
import { AutenticationServiceService } from './servicios/autentication-service.service';
import Swal from 'sweetalert2';

declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title = 'REAL-STORE';

  Usuario:EntidadUsuario = new EntidadUsuario();
  Datos:any[]=[];
  constructor(private servicio:AutenticationServiceService) { }
  login(){
    this.servicio.login(this.Usuario.email, this.Usuario.password).subscribe(data =>{
      if(data){
        $('#modal_login').modal('hide');
        this.Datos.push(data);
        localStorage.setItem('user',JSON.stringify(this.Datos));
        //Swal.fire('Bienvenido '+this.Datos[0]['nombre']+'!', 'Nos alegra verte nuevamente!', 'success');
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
          if (result.isConfirmed) {location.reload()}else{location.reload()}});
      }
      if(!data){
        const Toast = Swal.mixin({
          toast: true,
          position: 'center-end',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: true,
          showCloseButton: true
        })
        Toast.fire('Credenciales Erroneas', '', 'warning')
      }
    });
  }

}
