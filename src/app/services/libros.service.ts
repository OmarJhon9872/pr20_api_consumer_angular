import { Subject } from "rxjs";

export class LibroService{
    librosSubject = new Subject();

    private libros = ["Libro 1", "Libro 2", "otro libro"];

    agregarLibro(libroNombre: string){
        this.libros.push(libroNombre);
        this.librosSubject.next(this.libros);
    }

    eliminarLibro(libroNombre:string){
        this.libros = this.libros.filter(x => x!== libroNombre);
        this.librosSubject.next(this.libros);
    }

    obtenerLibros(){
        return [...this.libros];
    }
}
