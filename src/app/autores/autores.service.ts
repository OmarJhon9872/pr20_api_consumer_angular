import { Injectable } from '@angular/core';
import { Autor } from './autor.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AutoresService{

    baseUrl = environment.baseUrl;
    private autoresLista: Autor[] = [];
    private autoresSubject = new Subject<Autor[]>();

    constructor(private http: HttpClient){}

    obtenerAutores(){
        this.http.get<Autor[]>(this.baseUrl + 'api/libreriaAutor/')
            .subscribe( (data) => {
                this.autoresLista = data;
                // Cada que se llama al metodo next este manda un evento a aquellos
                // metodos suscritos para que puedan actualizar la interfaz de trabajo
                this.autoresSubject.next([...this.autoresLista]);
            })
        // Sin http -> return this.autoresLista.slice();
    }

    // Metodo que devolvera la data que deberia obtener obtenerAutores ya que no devuelve nada
    // solo es un metodo de obtencion de datos al subject
    obtenerActualListener(){
        return this.autoresSubject.asObservable();
    }



}