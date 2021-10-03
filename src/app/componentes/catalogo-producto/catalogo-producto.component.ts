import { Component, OnInit } from '@angular/core';
import { EntidadProducto } from 'src/app/modelos/entidad-producto';
import { ClienteServiceService } from 'src/app/servicios/cliente-service.service';
import Swal from 'sweetalert2';

declare var $:any;
@Component({
  selector: 'app-catalogo-producto',
  templateUrl: './catalogo-producto.component.html',
  styleUrls: ['./catalogo-producto.component.scss']
})
export class CatalogoProductoComponent implements OnInit {


  constructor(private servicio:ClienteServiceService) { }

  Producto: EntidadProducto[]=[];
  User:boolean = true;
  ngOnInit(): void {
    /* Verificar si el usuario esta logeado */
    let datos = localStorage.getItem('user');
      if(datos) this.User = false;
    /* ---------------- */
    /* cargar productos en el carrito luego de refrescar */
    let prods:any = localStorage.getItem('items');
    if(prods){
      this.items = JSON.parse(prods);
      this.CalcularPrecioTotal();
    }
    /* --------------------------- */

    this.servicio.ListarProductos().subscribe(data =>{
      //this.Producto = data;
    })
    var cod:any = localStorage.getItem('codcat');
    this.servicio.ListarProductosCategoria(cod).subscribe(data =>{
      this.Producto = data;
    })
  }

  login(){
    $('#modal_login').modal('show');
  }

  detalle(e:any){
    localStorage.setItem('codprod',e);
    location.href = 'detalle';
  }

  carrito(){
    location.href = 'carrito';
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
      this.CalcularPrecioTotal();
    }

    /* ---- ALERTA PRODUCTO AGREGADO ----*/
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
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

  CalcularPrecioTotal(){
    let subtotal = 0;
    let contador = 0;
    for (let element of this.items) {
      subtotal += parseFloat(element.subtotal);
      contador++
    }
    $('#subtotal').text('Subtotal:  $ '+subtotal);
    $('#total-productos').text('Mis Productos ('+contador+')');
  }

  remove(codprod:any){
    let index = 0;
    for (let info of this.items) {
      if(info.codprod == codprod){
        this.items.splice(index,1);
        localStorage.setItem('items',JSON.stringify(this.items));
      }
      index++
    }
    $('#'+codprod).remove();
    this.CalcularPrecioTotal();
  }
  /* ----fin codigo carrito----- */



  /* ----------------------------------- */
 /* OPCIONAL CODIGO PARA GENERAR CARRITO */
 /* ------------------------------------ */
  CargarProducto(){
    let subtotal = 0;
    var i = 0;
    let $items:any = document.querySelector('#items');
    $('.td').remove();
    for (let info of this.items) {
      const row = document.createElement('tr');
      row.setAttribute('class','td');
      row.setAttribute('id',info.codprod);
      row.innerHTML = `
        <td>
          <img src="${info.image}" width="80px">
        </td>
        <td style="text-align: center; vertical-align: middle;"><sup>${info.nombre}</sup></td>
        <td style="text-align: center; vertical-align: middle;"><sup>$${info.precio}</sup></td>
        <td style="text-align: center; vertical-align: middle;">
          <i class="delete fas fa-trash fa-1x" style="cursor: pointer;" data-id="${info.codprod}" ></i>
        </td>
        `;
        $items.appendChild(row);
        subtotal+=parseInt(info.precio);
        i += 1;
        $('#subtotal').text('Subtotal:  $ '+subtotal);
    }
  }
/* ----------------------------------- */

}

