import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { BookService } from './books.service';
import {Books} from './books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookNuevoComponent } from './book-nuevo.component';
import { Subscription } from 'rxjs';
import { PaginationBooks } from './pagination-books.model';

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

    // Acciones para crear la paginacion del componente
    protected totalLibros = 0;
    protected librosPorPagina = 2;
    protected paginaCombo = [1, 2, 5, 10];
    protected paginaAcual = 1;
    protected sort = "titulo";
    protected sortDirection = 'asc';
    protected filterValue = {};

    // Timeout para hacer filtro de busqueda
    timeout: any = null;

    constructor(private bookService: BookService,
                private dialog: MatDialog) {}

    // Ordenamiento de tabla
    ngAfterViewInit(){
        this.dataSource.sort = this.ordenamiento;
        this.dataSource.paginator = this.paginacion;
    }

    ngOnInit(): void {
        this.bookService.obtenerLibros(this.librosPorPagina, this.paginaAcual, this.sort, this.sortDirection, this.filterValue);
        this.bookService.obtenerActualListener()
            .subscribe( (pagination: PaginationBooks) => {
                this.dataSource = new MatTableDataSource<Books>(pagination.data);
                this.totalLibros = pagination.totalRows;
            });
    }
    ngOnDestroy(): void {
        this.bookSuscription.unsubscribe();
    }

    ordenarColumna(event: any){
        this.sort = event.active;
        this.sortDirection = event.direction;

        this.bookService.obtenerLibros(
            this.librosPorPagina,
            this.paginaAcual,
            event.active,
            event.direction,
            this.filterValue
        );
    }

    hacerFiltro(event: any){
        // <!-- Solucion 1 -->
        // const valueFiltro = (filtro.target as HTMLInputElement).value;

        clearTimeout(this.timeout);

        const $this = this;
        this.timeout = setTimeout(() => {
            if(event.keyCode != 13){
                const filterValueLocal = {
                    propiedad: "titulo",
                    valor: (event.target as HTMLInputElement).value
                }

                $this.filterValue = filterValueLocal;

                $this.bookService.obtenerLibros(
                    $this.librosPorPagina,
                    $this.paginaAcual,
                    $this.sort,
                    $this.sortDirection,
                    filterValueLocal
                );
            }
        }, 1000);
    }

    abrirDialog(){
        const dialogRef = this.dialog.open(BookNuevoComponent, {
            width: '550px'
        });

        // Evento para que cada que se cierre el dialog se actualice
        // la lista de libros
        dialogRef.afterClosed()
            .subscribe( () => {
                this.bookService.obtenerLibros(this.librosPorPagina, this.paginaAcual, this.sort, this.sortDirection, this.filterValue);
            });
    }

    eventoPaginador(event: PageEvent){
        this.librosPorPagina = event.pageSize;
        this.paginaAcual = event.pageIndex + 1;
        this.bookService.obtenerLibros(this.librosPorPagina, this.paginaAcual, this.sort, this.sortDirection, this.filterValue);
    }
}
