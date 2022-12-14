import { Component } from '@angular/core';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
})
export class UsuarioComponent {
    usuarios = ['Omar', 'Paco', 'Maria'];
    usuarioNombre = '';
    visible = true;

    constructor(){
      setTimeout(() => {
        this.visible = true;
      }, 3000);
    }

    onAgregarUsuario(){
        this.usuarios.push(this.usuarioNombre);
        this.usuarios = [...new Set(this.usuarios)]
    }
}
