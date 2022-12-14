import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { BookService } from './books.service';
import {Books} from './books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookNuevoComponent } from './book-nuevo.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {

    bookData: Books[] = [];
    // El ordenamiento empezara despues de que se inicie la vista con el metodo
    // AferViewInit implementado en el componente clase
    @ViewChild(MatSort) ordenamiento: MatSort;
    // Paginacion de tabla
    @ViewChild(MatPaginator) paginacion: MatPaginator;
    // Nombre de columnas usada en mat-header-row y mat-row
    desplegarColumnas = ["titulo", "descripcion", "autor", "precio"];
    // Fuente de datos que cargara la tabla
    dataSource = new MatTableDataSource<Books>();

    private bookSuscription: Subscription;

    constructor(private bookService: BookService,
                private dialog: MatDialog) {}

    // Ordenamiento de tabla
    ngAfterViewInit(){
        this.dataSource.sort = this.ordenamiento;
        this.dataSource.paginator = this.paginacion;
    }

    ngOnInit(): void {
        this.bookSuscription = this.bookService.bookSubject.subscribe(() => {
            this.dataSource.data = this.bookService.obtenerLibros();
        })
        this.dataSource.data = this.bookService.obtenerLibros();
    }
    ngOnDestroy(): void {
        this.bookSuscription.unsubscribe();
    }

    hacerFiltro(valueFiltro: any){
        // <!-- Solucion 1 -->
        // const valueFiltro = (filtro.target as HTMLInputElement).value;

        this.dataSource.filter = valueFiltro;
    }

    abrirDialog(){
        this.dialog.open(BookNuevoComponent, {
            width: '350px'
        });
    }
}
