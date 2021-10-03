import { Component, OnInit } from '@angular/core';
import { EntidadCategorias } from 'src/app/modelos/entidad-categorias';
import { EntidadProducto } from 'src/app/modelos/entidad-producto';
import { EntidadProveedor } from 'src/app/modelos/entidad-proveedor';
import { AdminServiceService } from 'src/app/servicios/admin-service.service';

declare var $:any;
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  constructor(private servicio:AdminServiceService) { }

  Productos:EntidadProducto[] = []
  Categorias:EntidadCategorias[] = []
  Proveedores:EntidadProveedor[] = []
  filterPost1:any= '';
  filterPost2:any= '';
  filterPost3:any= '';
  ProductoElimimado:EntidadProducto[] = []
  ProductoVigente:EntidadProducto[] = []


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

    this.servicio.ListarProductos().subscribe(data =>{
      this.Productos = data;
      this.ProductoElimimado = [];
      this.ProductoVigente = [];
      for(let element of this.Productos){
        if(element.eliminado == 'Si'){
          this.ProductoElimimado.push(element);
        }else{this.ProductoVigente.push(element)}
      }
    })
    this.servicio.ListarCategorias().subscribe(data =>{
      this.Categorias = data;
    })
    this.servicio.ListarProveedores().subscribe(data =>{
      this.Proveedores = data;
    })


  }

  ProductoCategoria(e:any){
    this.servicio.ListarProductosCategoria(e.target.value).subscribe(data =>{
      this.Productos = data;
    })
  }

  ProductoGeneral(){
    this.ngOnInit();
  }

  Prod:EntidadProducto = new EntidadProducto();
  checkbox:Boolean=false;
  categoria:any='';
  proveedor:any='';

  ModalProducto(codprod:any){
    this.servicio.buscarproducto(codprod).subscribe(data =>{
      this.Prod = data;
      if(this.Prod.eliminado == 'No'){
        this.checkbox=true
      }else{this.checkbox=false}


      for(let element of this.Categorias){/* ... OBTENER NOMBRE CATEGORIA ... */
        if(element.codigoCategoria == this.Prod.cod_categoria){
          this.categoria = element.nombreCategoria;
          }
      }
      for(let element of this.Proveedores){/* ... OBTENER NOMBRE PROVEEDOR ... */
        if(element.idProveedor == this.Prod.id_proveedor){
          this.proveedor = element.nombre;
          }
      }
    })
    $('#ModalProducto').modal('show');
  }

  cate(e:any){ /* OBTENIEDO VALOR DEL COMBO BOX CATEGORIA */
    this.Prod.cod_categoria = e.target.value;
  }
  provee(e:any){ /* OBTENIEDO VALOR DEL COMBO BOX PROVEEDORES */
    this.Prod.id_proveedor = e.target.value;
  }

  NuevoProducto(){this.Prod = new EntidadProducto()}

  RegistrarProducto(){
    this.Prod.image = $('#data-image').val();
    if(this.checkbox == true){
      this.Prod.eliminado = 'No'
    }else{this.Prod.eliminado = 'Si'}

    this.servicio.RegistrarProducto(this.Prod).subscribe(data =>{
      if(data)
      this.ngOnInit()
      alert("Registrado!")
    })
  }

  ActualizarProducto(codprod:any){
    this.Prod.image = $('#data-image-actualizar').val();
    if(this.checkbox == true){
      this.Prod.eliminado = 'No'
    }else{this.Prod.eliminado = 'Si'}

    this.servicio.ActualizarProducto(codprod,this.Prod).subscribe(data =>{
      if(data)
      $('#ModalProducto').modal('hide');
      this.ngOnInit()
      //alert("Actualizado!")
    })
  }

  image(){
    function readFile(input:any) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e:any) {
            var profile:any = document.getElementById('image-producto');
            profile.src = e.target.result
            $('#data-image').val(e.target.result);
          };
          reader.readAsDataURL(input.files[0]);
        }
    }

    var fileUpload:any = document.getElementById('file');
    fileUpload.onchange = function (e:any) {
        readFile(e.srcElement);
    };

  }

  ActualizarImagen(){
    function readFile(input:any) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e:any) {
            var profile:any = document.getElementById('image-producto-actualizar');
            profile.src = e.target.result
            $('#data-image-actualizar').val(e.target.result);
          };
          reader.readAsDataURL(input.files[0]);
        }
    }

    var fileUpload:any = document.getElementById('file-actualizar');
    fileUpload.onchange = function (e:any) {
        readFile(e.srcElement);
    };
  }

}
