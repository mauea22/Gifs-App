import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent  {
//el @ViewChild busca una referencia en el html (en este caso el #txtBuscar) y lo asigna a txtBuscar de tipo any
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  //inyecta el service
  constructor( private gifsService: GifsService){}


  buscar( ){
    //asigno el valor a una variable
    const valor = this.txtBuscar.nativeElement.value;

    //controlar el ingreso del input en vacío o solo con espacios
    if (valor.trim().length === 0) {
      return;
    }

    //inserto desde el método buscar en el service el valor
    this.gifsService.buscarGifs( valor );

    //limpio el formulario 
    this.txtBuscar.nativeElement.value = "";
  }
}
