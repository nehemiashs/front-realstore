import { Component, OnInit, ViewChild } from '@angular/core';
import Stepper from 'bs-stepper';

import { ClienteServiceService } from 'src/app/servicios/cliente-service.service';
import {IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
import { Item, PdfMakeWrapper, QR, Table, Txt } from 'pdfmake-wrapper';
import { createInjectableType } from '@angular/compiler';
import { pdfMake } from 'pdfmake/build/vfs_fonts';
import { AdminServiceService } from 'src/app/servicios/admin-service.service';
import { EntidadVentas } from 'src/app/modelos/entidad-ventas';
import { EntidadUsuario } from 'src/app/modelos/entidad-usuario';


declare var $:any;
@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.scss']
})
export class CarritoComprasComponent implements OnInit {

  public defaultPrice: string = '9.99';
  public payPalConfig ? : IPayPalConfig;

  public showSuccess: boolean = false;
  public showCancel: boolean = false;
  public showError: boolean = false;
  entidad:EntidadVentas = new EntidadVentas();
  public MostrarFactura: boolean = true;

  constructor(private servicio:ClienteServiceService, private service:AdminServiceService) { }

  items:any[]=[];
  Datos:any[]=[];
  User:boolean = true;
  ngOnInit(): void {
    /* verificar si el usuario esta logeado */
    let user:any = localStorage.getItem('user');
    if(user){
      this.Datos = JSON.parse(user);
      this.User = false;
      let btn_pago:any = document.getElementById('Pagar-Ahora');

        btn_pago.setAttribute('class','btn btn-success form-control');

    }
    /* ----------------------------------- */

    /* cargar productos en el carrito luego de refrescar */
    let prods:any = localStorage.getItem('items');
    if(prods)
      this.items = JSON.parse(prods);
      this.CalcularPrecioTotal();
    /* --------------------------- */

    /* paypal */
    let total:string = $('#total-pagar').val();
    this.initConfig(total.toString());
     /* -------- */

    /* --bs-stepper por defecto---*/
    $(document).ready(function () {
      var stepper = new Stepper($('.bs-stepper')[0])
    })
    /* ------------------------ */

  }

  next(){
    var step:any = document.querySelector('.bs-stepper');
    var stepper = new Stepper(step);
    stepper.next()
    //this.RegistrarVenta();
  }
  previous(){
    var step:any = document.querySelector('.bs-stepper');
    var stepper = new Stepper(step);
    stepper.previous()
  }

  login(){
    $('#modal_login').modal('show');
  }

/* ------------------ */
/* CARRITO DE COMPRAS */
/* ------------------- */
  CalcularPrecioTotal(){
    let subtotal = 0;
    let contador = 0;
    for (let element of this.items) {
      subtotal += parseFloat(element.subtotal);
      contador++;
    }
    $('#subtotal').text('$'+subtotal);
    $('#total').text('Total:  $'+subtotal);
    $('#subtotal2').text('$'+subtotal);

    $('#totalproductos').text('Carrito de Compras ('+contador+')');
    $('#subtotal-factura').text('$'+subtotal);
    let igv = subtotal*0.18;
    subtotal = subtotal + parseFloat(igv.toFixed(2));
    $('#igv').text('$'+igv.toFixed(2));
    $('#igv-factura').text('$'+igv.toFixed(2));
    $('#total-factura').text('$'+subtotal);
    $('#total2').text('Total:  $'+subtotal);
    $('#total-pagar').val(subtotal);
  }
  onKeyUp(x:any, codprod:any){
    let index = 0;
    for(let element of this.items){
      if(element.codprod == codprod){
        this.items[index]['cantidad'] = x.target.value;
        this.items[index]['subtotal'] = x.target.value * parseFloat(element.precio);
        localStorage.setItem('items',JSON.stringify(this.items));
        this.CalcularPrecioTotal();
      }
      index++;
    }
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
/* --------FIN CARRITO------- */


/* ------------------------------- */
/* ------- PAYPAL ---------------- */
/* ------------------------------- */
private initConfig(price: string): void {
  this.payPalConfig = {
    currency: 'EUR',
    clientId: 'Ab9lQNs8l4AOZETEw1gJ81JSYg-hOAJ9Gg6pIHtx7WSRAgHKyPsnTq_tCKEUnnx96JpkYp0j0uYK6RCF',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: price,
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: price
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: price,
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      this.RegistrarVenta(); // REGISTRAR VENTA
      actions.order.get().then((details: any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });

    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
      this.showCancel = true;

    },
    onError: err => {
      console.log('OnError', err);
      this.showError = true;
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
      this.resetStatus();
    },
    onInit: (data, actions) => {
      console.log('onInit', data, actions);
    }
  };
}

private resetStatus(): void {
  this.showError = false;
  this.showSuccess = false;
  this.showCancel = false;
}

/*----- FIN PAYPAL----------- */


/* ------------------------- */
/* --- REGISTRAR VENTA ---- */
/* ------------------------ */

RegistrarVenta(){
        /* ------------------------ */
        /*------ DATA - FACTURA ----*/
        /* ------------------------ */
        var fecha = new Date();
        $('#fecha').text('Fecha: '+fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear());
        $('#importe-adeudado').text('Importe Adeudado '+fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getMilliseconds());
        $('#fechapago').text(fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear());
        var words = ['A', '1', 'C','2', 'E', '3', 'G', '4','I', '5', 'K','6', 'M', '7', 'O', '8','Q', '9', 'S'];
          let idpedido:String ='';
          for (let i = 0; i < 6; i++) {
            var word = words[Math.floor(Math.random() * words.length)];
            idpedido += word;
            //alert(idpedido);
          }
        $('#idpedido').text(idpedido);

        /* ----------------------------- */
        /* ----- REGISTRO DE VENTAS -----*/
        /* ----------------------------- */
        let dni:any;
        for(let element of this.Datos){
          dni = element.dni;
          $('#nombre-usuario').text(element.nombre +' '+ element.apellido);
          $('#telefono-usuario').text(element.telefono);
          $('#email-usuario').text(element.email);
        }
        var fecha = new Date();
        var datetime = fecha.getFullYear() + "/" + (fecha.getMonth()+1) + "/" + fecha.getDate() + " "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
        this.entidad.dni = dni;
        this.entidad.fecha = datetime;
        this.entidad.idventas = idpedido;
        this.service.RegistrarVenta(this.entidad).subscribe(element =>{
          //this.entidad=element;
          if(element){
            //alert('VENTA REGISTRADA!');
            let detalleventa:any[] = [];
            let actualizarstock:any[] = [];
            for(let element of this.items){
              detalleventa.push({cantidad:element.cantidad,codprod:element.codprod,idventas:idpedido});
              actualizarstock.push({codprod:element.codprod,cantidad:element.cantidad});
            }
            this.service.RegistrarDetalleVenta(detalleventa).subscribe(element =>{
              //this.entidad=element;
              if(element){detalleventa.length = 0; /* alert('DETALLE REGISTRADA!'); */}
            })

            /* -------------- ACTUALIZAR STOCK ------------- */
            this.service.ActualizarStock(actualizarstock).subscribe(element =>{
              //this.entidad=element;S
              if(element){/* alert('ATUALIZACION EXITOSA!'); */ actualizarstock.length = 0}
            })
            /* ------------------------------------------- */
              }
        })

        /* -----------FIN REGISTRO VENTA-------------- */
        this.MostrarFactura = false;
        /* .......................... */
}
/* ------------------------ */

/* -------------------------- */
/* -------GENERAR PDF -------- */
/* -------------------------- */
generarPDF(){
  const pdf = new PdfMakeWrapper();
  const DATA:any = document.getElementById('carrito');
  pdf.add(new Txt(DATA).bold().italics().end);
  pdf.add(new Table([
    [ 'codigo', 'producto'],

    ]).end);
  pdf.add( new QR('my code').fit(100).end);
  var html:any = document.getElementById('carrito')?.innerText;
  pdf.add( new Blob(this.items));
  pdf.create().open();
  //pdf.create().download("Score_Details.pdf");

  var now = new Date();



  }





}
