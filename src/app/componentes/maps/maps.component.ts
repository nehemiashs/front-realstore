import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  constructor() { }

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
  }

}
