import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from './seguridad.service';
import {Injectable} from '@angular/core';

@Injectable()
export class SeguridadRouter implements CanActivate {
    constructor(
        private seguridadService: SeguridadService,
        private router: Router
    ) {}

    // Middleware de rutas
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        if (this.seguridadService.usuarioEstaEnSesion()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
