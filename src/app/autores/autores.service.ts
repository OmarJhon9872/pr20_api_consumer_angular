import { Injectable } from '@angular/core';
import { Autor } from './autor.model';


@Injectable({
    providedIn: 'root'
})
export class AutoresService{
    private autoresLista: Autor[] = [
        {autorId: 1, nombre: 'Jonathan', apellido: 'Moreno', gradoAcademico: 'Inge'},
        {autorId: 2, nombre: 'Omar', apellido: 'Perez', gradoAcademico: 'Lic'},
        {autorId: 3, nombre: 'Paco', apellido: 'Diaz', gradoAcademico: 'Lic'},
        {autorId: 4, nombre: 'Roberto', apellido: 'Lucas', gradoAcademico: 'Inge'},
    ];

    obtenerAutores(){
        return this.autoresLista.slice();
    }



}