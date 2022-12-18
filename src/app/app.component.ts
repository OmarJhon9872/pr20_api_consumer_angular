import { Component, OnInit } from '@angular/core';
import { SeguridadService } from './seguridad/seguridad.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    abrirMenu = false;

    constructor(private seguridadService: SeguridadService) {}

    ngOnInit(): void {
        //Como sera el primer componente que se cargue al entrar a la app
        // se llama a cargarUsuario para verificar el localStorage y
        // verificar haya token de seguidad valido y lo actualice
        this.seguridadService.cargarUsuario();
    }
}
