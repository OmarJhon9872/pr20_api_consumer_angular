import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from "@angular/material/core";
import { MatDatepicker } from "@angular/material/datepicker";
import { MatSelectChange } from "@angular/material/select";
import { BookService } from './books.service';
import { MatDialog } from '@angular/material/dialog';
import { Autor } from '../autores/autor.model';
import { AutoresService } from '../autores/autores.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-book-nuevo',
    templateUrl: 'book-nuevo.component.html'
})

export class BookNuevoComponent implements OnInit, OnDestroy{

    selectAutor: string;

    // Para la fecha hay que configurar la zona horaria en app.module
    // importar MatNativeDateModule aparte de MatDatepickerModule
    @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;

    selectAutorTexto: string = '';
    fechaPublicacion: string = '';

    autores: Autor[] = [];

    autorSuscription: Subscription;

    constructor(private bookService: BookService,
                private dialogRef: MatDialog,
                private autoresService: AutoresService){

    }

    ngOnInit(): void {
        this.autoresService.obtenerAutores();
        this.autorSuscription = this.autoresService.obtenerActualListener()
            .subscribe( (autoresBackend: Autor[]) => {
                this.autores = autoresBackend;
            })
    }
    ngOnDestroy(): void {
        this.autorSuscription.unsubscribe();
    }

    guardarLibro(form: NgForm){

        if(form.valid){

            const autorRequest = {
                id: this.selectAutor,
                nombreCompleto: this.selectAutorTexto,
            }

            const libroRequest = {
                id: '',
                descripcion: form.value.descripcion,
                titulo: form.value.titulo,
                autor: autorRequest,
                precio: parseInt(form.value.precio),
                fechePublicacion: new Date(this.fechaPublicacion)
            }

            this.bookService.guardarLibro(libroRequest);
            this.autorSuscription = this.bookService.guardarLibroListener()
                .subscribe( () => {
                    this.dialogRef.closeAll();
                });
        }
    }

    // Select input
    selected(event: MatSelectChange){
        this.selectAutorTexto = (event.source.selected as MatOption).viewValue;
    }
}