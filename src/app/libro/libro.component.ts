import { Component, EventEmitter, Input, Output } from "@angular/core";
import { LibroService } from './../services/libros.service';

@Component({
    selector: 'app-libro',
    templateUrl: './libro.component.html',
    styleUrls: ['./libro.component.css']
})

export class LibroComponent{
    @Input('tituloLibroPadre') tituloLibro: string = '';

    // Para indicar que el evento saldra del elemento hijo
    // se utiliza el decorador Output
    @Output() libroClicked = new EventEmitter<string>();

    constructor(private libroService: LibroService){
    }

    onClicked(libro: string){
        this.libroClicked.emit(libro);
        this.libroService.eliminarLibro(libro);
    }
}
