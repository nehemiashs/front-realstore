import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { EntidadVentas } from 'src/app/modelos/entidad-ventas';
import { AdminServiceService } from 'src/app/servicios/admin-service.service';


@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Junio', 'Julio'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public chartColors = [{backgroundColor:'green'}];

  public barChartData: ChartDataSets[] = [{ data: [10,30], label: 'Series A' }];

  constructor(private servicio:AdminServiceService) { }

  Ventas:EntidadVentas[] = [];
  info:any[] = [];
  cantidad:any[] = [];

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

    this.servicio.ListarVentasGeneral().subscribe(data =>{
      this.Ventas = data;
        let junio = 0;
        let julio = 0;
        for(let iterator of this.Ventas){
          if(iterator.fecha.substr(0,7) == '2021-06'){junio++}
          if(iterator.fecha.substr(0,7) == '2021-07'){julio++}
        }
        this.cantidad.push(junio,julio)
        //this.barChartData = [];
        this.barChartData.push({data:this.cantidad, label:'Ventas'})
        //this.chartColors.push({backgroundColor:'blue'})
    })
  }


}
