import {Books} from './books.model';
import { Subject } from 'rxjs';

export class BookService{

    private booksLista: Books[] = [
        {libroId: 1, titulo: "Nombre 1", descripcion: "Descrip1", autor: "Jon", precio: 10},
        {libroId: 2, titulo: "Nombre 2", descripcion: "Descrip2", autor: "Omar", precio: 20},
        {libroId: 3, titulo: "Nombre 3", descripcion: "Descrip3", autor: "Jonax", precio: 30},
        {libroId: 4, titulo: "Nombre 4", descripcion: "Descrip4", autor: "Pepe", precio: 40},
    ];

    bookSubject = new Subject<Books>();

    obtenerLibros(){
        return this.booksLista.slice();
    }

    guardarLibro(libro: Books){
        this.booksLista.push(libro);
        this.bookSubject.next(libro)
    }
}