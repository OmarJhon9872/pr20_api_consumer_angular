import {Usuario} from './usuario.model';
import { LoginData } from "./login-data.model";
import {Subject} from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

// Para poder inyectar el servicio de router
@Injectable()
export class SeguridadService{
    private usuario: Usuario;

    // Observable tras cada cambio
    seguridadCambio = new Subject<boolean>();

    constructor(private router: Router){

    }

    registrarUsuario(usr: Usuario){
        this.usuario = {
            email: usr.email,
            usuarioId: Math.round(Math.random() * 10000).toString(),
            nombre: usr.nombre,
            apellidos: usr.apellidos,
            username: usr.username,
            password: ''
        }

        // Emision de eventos de un observable
        this.seguridadCambio.next(true);

        this.router.navigate(['/']);
    }

    login(loginData: LoginData){
        this.usuario = {
            email: loginData.email,
            usuarioId: Math.round(Math.random() * 10000).toString(),
            nombre: '',
            apellidos: '',
            username: '',
            password: ''
        }

        // Emision de eventos de un observable
        this.seguridadCambio.next(true);

        this.router.navigate(['/']);
    }

    salirSesion(){
        this.usuario = {} as Usuario;

        // Emision de eventos de un observable
        this.seguridadCambio.next(false);

        this.router.navigate(['/login']);
    }

    obtenerUsuario(){
        // Me devolvera el usuario mas actualizado
        return {...this.usuario};
    }

    usuarioEstaEnSesion(){
        return this.usuario != null;
    }
}