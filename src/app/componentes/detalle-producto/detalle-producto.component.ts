import { Component, OnInit } from '@angular/core';
import { ClienteServiceService } from 'src/app/servicios/cliente-service.service';
import Swal from 'sweetalert2';

declare var $:any;
@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {

  constructor(private servicio:ClienteServiceService) { }

  Producto:any[]=[];
  User:boolean = true;
  ngOnInit(): void {
    /* Verificar si el usuario esta logeado */
    let datos = localStorage.getItem('user');
      if(datos) this.User = false;
    /* ------------------------------- */
    var codprod:any = localStorage.getItem('codprod');
    this.servicio.buscarproducto(codprod).subscribe(data =>{
      this.Producto.push(data);
    })

    /* cargar productos en el carrito luego de refrescar */
    let prods:any = localStorage.getItem('items');
    if(prods)
      this.items = JSON.parse(prods);
    /* --------------------------- */
  }

  image(e:any){
    $('#image_').attr('src',e);
  }

  login(){
    $('#modal_login').modal('show');
  }

  /* -------------------- */
  /* click agregar carrito */
  /* --------------------- */
  items:any[]=[];
  addcarrito(codprod:any,image:any,nombre:any,precio:any,cantidad:any,subtotal:any){
    let identificador:boolean = false;
    let icono:any = '';
    if(this.items)
      for (let info of this.items) {
        if(info.codprod == codprod){
          identificador = true;
          icono = 'info';
        }
      }

    if(identificador == false){
      icono = 'success';
      this.items.push({codprod:codprod,image:image,nombre:nombre,precio:precio,cantidad:cantidad,subtotal:subtotal})
      localStorage.setItem('items',JSON.stringify(this.items));
    }

    /* ---- ALERTA PRODUCTO AGREGADO ----*/
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-left',
      //background: 'rgba(128, 255, 0, 0.911)',
      timer: 3000,
      timerProgressBar: false,
      showConfirmButton: false,
      showCloseButton: true,
      showCancelButton: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Bien!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i> Cerrar',
      cancelButtonAriaLabel: 'Thumbs down'
    })
    Toast.fire('<b class="text-secondary">Producto Añadido!</b>','<p class="text-secondary">'+nombre+'</p>', icono)
  }

}

