export class EntidadDetalleVenta {
  iddetalle:number;
	cantidad:number;
	codprod:number;
	idventas:String;

  constructor(iddetalle:number=0,cantidad:number=0,codprod:number=0,idventas:String=""){
    this.iddetalle=iddetalle;
    this.cantidad=cantidad;
    this.codprod=codprod;
    this.idventas=idventas;
  }
}
