import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario.component';

import { FormsModule } from '@angular/forms';
import { LibrosComponent } from './libros/libros.component';
import { LibroComponent } from './libro/libro.component';
import { LibroService } from './services/libros.service';
import { InicioComponent } from './inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { LoginComponent } from './seguridad/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarraComponent } from './navegacion/barra/barra.component';
import { MenuListaComponent } from './navegacion/menu-lista/menu-lista.component';
// import { SeguridadService } from './seguridad/seguridad.service';
import { BooksComponent } from './books/books.component';
// Se comenta ya que el servicio ya es accesible gracias al decorator
// Inject de cada servicio
// import { BookService } from './books/books.service';
import { BookNuevoComponent } from './books/book-nuevo.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AutoresComponent } from './autores/autores.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SeguridadInterceptor } from './seguridad/seguridad-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    LibrosComponent,
    LibroComponent,
    InicioComponent,
    RegistrarComponent,
    LoginComponent,
    BarraComponent,
    MenuListaComponent,
    BooksComponent,
    BookNuevoComponent,
    AutoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [
    LibroService,
    // SeguridadService,
    // BookService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
    {provide: HTTP_INTERCEPTORS, useClass: SeguridadInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
// Significa que el componente sera generado por una accion de
// otro componente Angular por eso se importa aqui
  entryComponents: [BookNuevoComponent]
})
export class AppModule { }
