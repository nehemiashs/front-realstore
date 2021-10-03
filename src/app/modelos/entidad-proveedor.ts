export class EntidadProveedor {
  nombre:string;
  cargo:string;
  direccion:string;
  email:string;
  idProveedor:string;

  constructor(nombre:string="",
    cargo:string="",
    direccion:string="",
    email:string="",
    idProveedor:string=""){
      this.nombre=nombre;
      this.cargo=cargo;
      this.email=email;
      this.direccion=direccion;
      this.idProveedor=idProveedor;

  }
}
