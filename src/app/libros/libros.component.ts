import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { LibroService } from './../services/libros.service';

@Component({
    selector: 'app-libros',
    templateUrl: './libros.component.html'
})

export class LibrosComponent implements OnInit, OnDestroy {
    libros:any = [];

    private libroSuscription: Subscription = new Subscription();

    constructor(private libroService: LibroService){

    }

    ngOnDestroy(){
        this.libroSuscription.unsubscribe();
    }

    ngOnInit(){
        this.libros = this.libroService.obtenerLibros();

        // Tras cada actualizacion de datos en los services
        // habra una suscripcion activa por lo que hay que
        // destruirla cada que se elimine el componente
        // ngOnDestroy
        this.libroSuscription = this.libroService.librosSubject.subscribe( ()=> {
            this.libros = this.libroService.obtenerLibros();
        });
    }

    eliminarLibro(libro: string){
    }

    guardarLibro(f: any){
        console.log("f", f);
        if(f.valid){
            this.libroService.agregarLibro(f.value.nombreLibro);
        }
    }
}
