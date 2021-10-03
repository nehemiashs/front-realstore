export class EntidadUsuario {
  dni:number;
  nombre:String;
  apellido:String;
  email:String;
  image:String;
  password:String;
  genero:String;
  fech_nacimiento:String;
  telefono:number;
  codigo:number;
  eliminado:String;

  constructor (dni:number=0, nombre:String="", apellido:String="",
              email:String="",image:String="", password:String="", genero:String="",
              fech_nacimiento:String="", telefono:number=0, codigo:number=1, eliminado:String="No"){
                this.dni=dni;
                this.nombre=nombre;
                this.apellido=apellido;
                this.email=email;
                this.image=image;
                this.password=password;
                this.genero=genero;
                this.fech_nacimiento=fech_nacimiento;
                this.telefono=telefono;
                this.codigo=codigo;
                this.eliminado=eliminado;
              }

}
