import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Autor } from './autor.model';
import { AutoresService } from './autores.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-autores',
    templateUrl: './autores.component.html',
    styleUrls: ['./autores.component.css'],
})
export class AutoresComponent implements OnInit, OnDestroy {

    desplegarColumnas = ['nombre', 'apellido', 'gradoAcademico'];
    dataSource = new MatTableDataSource<Autor>();
    private autorSuscription: Subscription;

    constructor(private autoresService: AutoresService) {}

    ngOnInit(): void {
        this.autoresService.obtenerAutores();

        this.autorSuscription = this.autoresService
            .obtenerActualListener()
            .subscribe( (autores: Autor[]) => {
                this.dataSource.data = autores;
            });
    }

    ngOnDestroy(): void {
        this.autorSuscription.unsubscribe();
    }

}
