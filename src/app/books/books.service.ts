import {Books} from './books.model';
import { Subject, Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginationBooks } from './pagination-books.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BookService{

    /* private booksLista: Books[] = [
        {libroId: 1, titulo: "Nombre 1", descripcion: "Descrip1", autor: "Jon", precio: 10},
        {libroId: 2, titulo: "Nombre 2", descripcion: "Descrip2", autor: "Omar", precio: 20},
        {libroId: 3, titulo: "Nombre 3", descripcion: "Descrip3", autor: "Jonax", precio: 30},
        {libroId: 4, titulo: "Nombre 4", descripcion: "Descrip4", autor: "Pepe", precio: 40},
    ]; */
    private booksLista: Books[] = [];
    private baseUrl = environment.baseUrl;

    bookSubject = new Subject();

    // Subject para un pagination
    bookPaginationSubject = new Subject<PaginationBooks>();
    bookPagination: PaginationBooks;

    constructor(private http: HttpClient){}

    obtenerLibros(libroPagina:number, paginaActual: number, sort: string, sortDirection: string, filterValue: any){
        const request = {
            pageSize: libroPagina,
            page: paginaActual,
            sort,
            sortDirection,
            filterValue
        };

        this.http.post<PaginationBooks>(this.baseUrl + "api/libro/pagination", request)
            .subscribe( (response) => {
                this.bookPagination = response;

                this.bookPaginationSubject.next(this.bookPagination);
            })
        // return this.booksLista.slice();
    }

    obtenerActualListener(){
        return this.bookPaginationSubject.asObservable();
    }

    guardarLibro(libro: Books){
        this.http.post(this.baseUrl + "api/libro", libro)
            .subscribe( (response) => {
                this.bookSubject.next(libro)
            });
    }

    guardarLibroListener(){
        return this.bookSubject.asObservable();
    }
}