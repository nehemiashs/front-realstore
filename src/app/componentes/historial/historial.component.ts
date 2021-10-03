import { Component, OnInit } from '@angular/core';
import { EntidadDetalleVentaIdCliente } from 'src/app/modelos/entidad-detalle-venta-id-cliente';
import { EntidadUsuario } from 'src/app/modelos/entidad-usuario';
import { EntidadVentas } from 'src/app/modelos/entidad-ventas';
import { AdminServiceService } from 'src/app/servicios/admin-service.service';

declare var $:any;
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  constructor(private servicio:AdminServiceService) { }

  Ventas: EntidadVentas[]=[];
  DetalleVentas: EntidadDetalleVentaIdCliente[]=[];
  Data:EntidadUsuario[]=[];

  Administrador:boolean = false;
  User:boolean = false;
  SinVerificar:boolean = false;
  ngOnInit(): void {
    let user:any=localStorage.getItem("user")
    let USUARIO = JSON.parse(user);
    this.Data = USUARIO;
    for(let ele of this.Data){
      if(ele.codigo == 2){
        this.User = true;
      }
      if(ele.codigo == 3){
        this.Administrador = true;
      }
    }

    this.servicio.ListarVentas(this.Data[0]['dni']).subscribe(data =>{
      this.Ventas = data;
    })
  }

  DetalleVenta(idventa:any,fecha:any){
    this.servicio.ListarVentaIdCliente(idventa,fecha).subscribe(data =>{
      this.DetalleVentas = data;

      let total = 0;
      for(let element of this.DetalleVentas){
        total += element.precio * element.cantidad;
      }
      let igv = (total*0.18).toFixed(2);
      $('#fecha').text(fecha);
      $('#total').text(total.toLocaleString());
      $('#igv').text(parseFloat(igv).toLocaleString());
      $('#total-abonado').text((total + parseFloat(igv)).toLocaleString());
    })
  }

}
