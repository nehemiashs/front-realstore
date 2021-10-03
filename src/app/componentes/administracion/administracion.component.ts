import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { EntidadContacto } from 'src/app/modelos/entidad-contacto';
import { EntidadDetalleVenta } from 'src/app/modelos/entidad-detalle-venta';
import { EntidadDetalleVentaIdCliente } from 'src/app/modelos/entidad-detalle-venta-id-cliente';
import { EntidadSuscriptor } from 'src/app/modelos/entidad-suscriptor';
import { EntidadVentas } from 'src/app/modelos/entidad-ventas';
import { AdminServiceService } from 'src/app/servicios/admin-service.service';

declare var $:any;
@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;
  public barChartPlugins = [];
  public chartColors:any = [];

  public barChartData: ChartDataSets[] = [];
  constructor(private servicio:AdminServiceService) { }

  Usuario:any[] =[];
  Administrador:boolean = false;
  User:boolean = false;
  SinVerificar:boolean = false;

  Ventas:EntidadVentas[] = [];
  Contactos:EntidadContacto[] = [];
  Suscriptores:EntidadSuscriptor[] =[];

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
    this.servicio.ListarVentasGeneral().subscribe(data =>{
      this.Ventas = data;
      let contador = 0;
      let FechasVenta:EntidadVentas[] = [];
      for(let element of this.Ventas){
        let identificador:boolean = false;
        if(FechasVenta){
          for(let ele of FechasVenta){
            if(ele.fecha.substr(8,2) == element.fecha.substr(8,2)){identificador = true}
          }
        }
        if(identificador == false){FechasVenta.push(element)}
        contador++
      }

      let GraficoVentasDiarias:any[] = []
      for(let e of FechasVenta){console.log(e)
        let contador = 0;
        for(let i of this.Ventas){
          if(i.fecha.substr(8,2) == e.fecha.substr(8,2)){contador++}
        }
        GraficoVentasDiarias.push(contador)
      }//GraficoVentasDiarias.forEach(ele =>(console.log(ele)))

      this.barChartData =[];
      this.barChartData.push({data:GraficoVentasDiarias, label:'Ventas'})
      $('#ventas').text(contador);
    })

    let Ventas:EntidadDetalleVentaIdCliente[] = [];
    this.servicio.ListarDetalleVentaGeneral().subscribe(data =>{
      Ventas = data;

      let cant = 0;
      for(let element of Ventas){
        cant += element.cantidad * element.precio;
      }
      let igv = (cant * 0.18).toFixed(2);
      $('#total').text('$'+(cant + parseFloat(igv)).toLocaleString());


      let fechas:EntidadDetalleVentaIdCliente[] = [];
      for(let i of Ventas){
        let ide:boolean = false
        if(fechas){
          for(let elemet of fechas){
            if(elemet.fecha_venta.substr(0,10) == i.fecha_venta.substr(0,10)){ide = true;}
          }
        }
        if(ide == false)
          fechas.push(i);
      }

      let GraficoFecha:any [] = [];
      let GraficoData:any [] = [];
      for(let i of fechas){
        let cantprod = 0;
        for(let e of Ventas){
          if(e.fecha_venta.substr(8,2) == i.fecha_venta.substr(8,2)){cantprod+= e.cantidad}
        }
        GraficoFecha.push(i.fecha_venta.substr(8,2))
        GraficoData.push(cantprod)
      }
      this.barChartLabels = ['Domingo','Lunes','Miercoles','Jueves','Viernes','Sabado'];
      //this.barChartData =[];
      this.barChartData.push({data:GraficoData, label:'Productos'})
      //this.barChartData.push({data:GraficoDataVentas, label:'Ventas'})
      //this.chartColors.push({backgroundColor:'skyblue'})
      //GraficoData.forEach(ele=>(console.log(ele)))
    })

    this.servicio.ListarSuscriptores().subscribe(data =>{
      this.Suscriptores = data;

      let contador = 0;
      for(let ele of this.Suscriptores){
        contador++
      }
      $('#suscriptores').text('+ '+contador);
    })

    this.servicio.ListarContactos().subscribe(data =>{
      this.Contactos = data;
      let contador = 0;
      for(let ele of this.Contactos){
        contador++
      }
      $('#cantidad').text(contador)
    })
  }

  CerrarSesion(){
    localStorage.removeItem('user');
  }

  Mensaje(email:any,asunto:any,nombre:any,fecha:any,mensaje:any){
    $('#email-usuario').text(email);
    $('#asunto-usuario').text(asunto);
    $('#nombre-usuario').text(nombre);
    $('#fecha-usuario').text(fecha);
    $('#mensaje-usuario').text(mensaje);
    $('#nombre-admin').text(this.Usuario[0]['nombre'])

    $('#ModalMensaje').modal('show');
  }
}
