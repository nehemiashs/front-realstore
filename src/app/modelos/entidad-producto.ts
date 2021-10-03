export class EntidadProducto {
  codigo: String;
    nombre: String;
    descripcion: String;
    image: String;
    stock: number;
    precio: String;
    cod_categoria: number;
    id_proveedor: String;
    eliminado:String;

    constructor (codigo:string="", nombre:String="", descripcion:String="",
    image:String="", stock:number=0, precio:String="",
    cod_categoria:number=0, id_proveedor:String="", elimando:String=""){
                this.codigo = codigo;
                this.nombre=nombre;
                this.descripcion=descripcion;
                this.image=image;
                this.stock=stock;
                this.precio=precio;
                this.cod_categoria=cod_categoria;
                this.id_proveedor=id_proveedor;
                this.eliminado=elimando;
              }
}
