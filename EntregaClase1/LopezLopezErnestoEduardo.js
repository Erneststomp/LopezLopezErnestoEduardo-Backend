class Usuario{
    constructor(nombre, apellido){
        this.nombre=nombre;
        this.apellido=apellido;
        this.libros=[];
        this.mascotas=[];
    }
    getFullName=function(){
        console.log(`Mi nombre completo es: ${this.nombre} ${this.apellido}`)
    }
    addMascota=function(nuevamascota){
        this.mascotas.push.apply(this.mascotas,nuevamascota);
    }
    countMascotas=function(){
        console.log(`${this.nombre} tiene ${this.mascotas.length} mascotas`)
    }
    addBook=function(libro){
        this.libros.push(libro)
    }
    getBookNames=function(){
        console.log(`Los autores son ${this.libros[0].autor}`)
    }
}
const dataBooks ={
    autor: ["J. R. R. Martin",'J. R. R. Tolkien' ],
    nombre: ['Game of Thrones', 'El Hobitt']
}
dataPets=['Gea','Sr. Bigotes']

let nuevoUsuario= new Usuario('Ernesto Eduardo','Lopez Lopez')
nuevoUsuario.getFullName();
nuevoUsuario.addBook(dataBooks);
nuevoUsuario.addMascota(dataPets);
nuevoUsuario.getBookNames();
nuevoUsuario.countMascotas();
