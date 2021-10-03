export class EntidadVentas {
    cod_factura:number;
    idventas:String;
    fecha:String;
    dni:String;
    constructor(cod_factura:number=0,idventas:String="", fecha:String="", dni:String=""){

      this.cod_factura=cod_factura;
      this.idventas=idventas;
      this.fecha=fecha;
      this.dni=dni;

    }
}
