export class EntidadSuscriptor {
  cod_sub:number;
  email:String;

  constructor(cod_sub:number=0, email:String=""){
    this.cod_sub=cod_sub;
    this.email=email;
  }
}
