import { Usuario } from './usuario.model';
import { LoginData } from './login-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

// Para poder inyectar el servicio de router
@Injectable({
    providedIn: 'root',
})
export class SeguridadService {
    private usuario: Usuario;

    // Autorizacion
    baseUrl = environment.baseUrl;
    token = '';

    // Observable tras cada cambio
    seguridadCambio = new Subject<boolean>();

    constructor(private router: Router, private http: HttpClient) {}

    cargarUsuario() {
        const tokenBrowser = localStorage.getItem('token');
        if (!tokenBrowser) {
            return;
        }

        this.token = tokenBrowser;
        this.seguridadCambio.next(true);

        this.http
            .get<Usuario>(this.baseUrl + 'usuario')
            .subscribe((response) => {
                console.log('Login respuesta: ', response);

                this.token = response.token;

                this.usuario = {
                    usuarioId: response.usuarioId,
                    email: response.email,
                    nombre: response.nombre,
                    apellido: response.apellido,
                    username: response.username,
                    password: '',
                    token: response.token,
                };

                // Notifica a componentes que le consulten que se
                // ha iniciado sesion
                this.seguridadCambio.next(true);
                // Guardamos en localstorage el token
                localStorage.setItem('token', response.token);
            });
    }

    registrarUsuario(usr: Usuario) {
        this.http
            .post<Usuario>(this.baseUrl + 'usuario/registrar', usr)
            .subscribe((response) => {
                this.token = response.token;

                this.usuario = {
                    usuarioId: response.usuarioId,
                    email: response.email,
                    nombre: response.nombre,
                    apellido: response.apellido,
                    username: response.username,
                    password: '',
                    token: response.token,
                };

                // Notifica a componentes que le consulten que se
                // ha iniciado sesion
                this.seguridadCambio.next(true);
                // Guardamos en localstorage el token
                localStorage.setItem('token', response.token);
                this.router.navigate(['/']);
            });

        // this.usuario = {
        //     email: usr.email,
        //     usuarioId: Math.round(Math.random() * 10000).toString(),
        //     nombre: usr.nombre,
        //     apellidos: usr.apellidos,
        //     username: usr.username,
        //     password: '',
        //     token: ''
        // }

        // Emision de eventos de un observable
        // this.seguridadCambio.next(true);

        // this.router.navigate(['/']);
    }

    obtenerToken(): string {
        return this.token;
    }

    login(loginData: LoginData) {
        this.http
            .post<Usuario>(this.baseUrl + 'usuario/login', loginData)
            .subscribe((response) => {
                console.log('Login respuesta: ', response);

                this.token = response.token;

                this.usuario = {
                    usuarioId: response.usuarioId,
                    email: response.email,
                    nombre: response.nombre,
                    apellido: response.apellido,
                    username: response.username,
                    password: '',
                    token: response.token,
                };

                // Notifica a componentes que le consulten que se
                // ha iniciado sesion
                this.seguridadCambio.next(true);
                // Guardamos en localstorage el token
                localStorage.setItem('token', response.token);
                this.router.navigate(['/']);
            });
    }

    salirSesion() {
        this.usuario = {} as Usuario;

        // Emision de eventos de un observable
        this.seguridadCambio.next(false);

        // Eliminamos token
        localStorage.removeItem('token');

        this.router.navigate(['/login']);
    }

    obtenerUsuario() {
        // Me devolvera el usuario mas actualizado
        return { ...this.usuario };
    }

    usuarioEstaEnSesion() {
        return this.token != null;
    }
}
