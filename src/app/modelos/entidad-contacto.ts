export class EntidadContacto {
  cod_cont:number;
  nombre:String;
  email:String;
  asunto:String;
  mensaje:String;
  estado:String;
  fecha:String;
  constructor(cod_cont:number=0, nombre:String="",
  email:String="", asunto:String="",
  mesaje:String="", estado:String="No",
  fecha:String=""){
    this.cod_cont=cod_cont;
    this.nombre=nombre;
    this.email=email;
    this.asunto=asunto;
    this.mensaje=mesaje;
    this.estado=estado;
    this.fecha=fecha;
  }
}
