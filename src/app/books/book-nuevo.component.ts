import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from "@angular/material/core";
import { MatDatepicker } from "@angular/material/datepicker";
import { MatSelectChange } from "@angular/material/select";
import { BookService } from './books.service';
import { MatDialog } from '@angular/material/dialog';
import { Autor } from '../autores/autor.model';
import { AutoresService } from '../autores/autores.service';

@Component({
    selector: 'app-book-nuevo',
    templateUrl: 'book-nuevo.component.html'
})

export class BookNuevoComponent implements OnInit{

    selectAutor: string;

    // Para la fecha hay que configurar la zona horaria en app.module
    // importar MatNativeDateModule aparte de MatDatepickerModule
    @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;

    selectAutorTexto: string = '';
    fechaPublicacion: string = '';

    autores: Autor[] = [];

    constructor(private bookService: BookService,
                private dialogRef: MatDialog,
                private autoresService: AutoresService){

    }

    ngOnInit(): void {
        this.autores = this.autoresService.obtenerAutores();
    }

    guardarLibro(form: NgForm){

        if(form.valid){
            this.bookService.guardarLibro({
                libroId: 1,
                descripcion: form.value.descripcion,
                titulo: form.value.titulo,
                autor: this.selectAutorTexto,
                precio: form.value.precio,
                fechaPublicacion: new Date(this.fechaPublicacion)
            });

            this.dialogRef.closeAll();
        }

    }

    // Select input
    selected(event: MatSelectChange){
        this.selectAutorTexto = (event.source.selected as MatOption).viewValue;
    }
}