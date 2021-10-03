export class EntidadDetalleVentaIdCliente {
  id_detalle:number
  cod_prod:number;
	nombre:string;
	cantidad:number;
  fecha_venta:String;
	precio:number;

  constructor(id_detalle:number=0,cod_prod:number=0,nombre:string="",cantidad:number=0,fecha_venta="",precio:number=0){
    this.id_detalle=id_detalle;
    this.cod_prod=cod_prod;
    this.nombre=nombre;
    this.cantidad=cantidad;
    this.fecha_venta=fecha_venta;
    this.precio=precio;
  }
}
