import { Component, OnInit } from '@angular/core';
import { EntidadUsuario } from 'src/app/modelos/entidad-usuario';
import { AutenticationServiceService } from 'src/app/servicios/autentication-service.service';
import { ClienteServiceService } from 'src/app/servicios/cliente-service.service';
import Swal from 'sweetalert2';

declare var $:any;
@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent implements OnInit {

  constructor(private servicio:AutenticationServiceService) { }

  Usuario:EntidadUsuario = new EntidadUsuario()
  ngOnInit(): void {
  }

  FormRegistro(value:any){

    if($('#password1').val() == $('#password2').val() && $('#password2').val() != ""){
      this.servicio.registrar(this.Usuario).subscribe(data =>{
        if(data){
          const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            timer: 3000,
            timerProgressBar: false,
            showConfirmButton: true,
            showCloseButton: true,
            showCancelButton: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> Bien!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
              '<i class="fa fa-thumbs-down"></i> Cerrar',
            cancelButtonAriaLabel: 'Thumbs down'
          })
          Toast.fire('Registro Exitoso', this.Usuario.nombre + '; ya puedes realizar tus compras', 'success').then((result) => {
            if (result.isConfirmed) {location.href = 'autentication'}});
        }
      })
    }
    console.log(value)
  }
}
