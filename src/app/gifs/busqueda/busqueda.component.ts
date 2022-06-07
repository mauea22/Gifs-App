import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent  {
//el @ViewChild busca una referencia en el html (en este caso el #txtBuscar) y lo asigna a txtBuscar de tipo any
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  buscar( termino:string){
    //asigno el valor a una variable
    const valor = this.txtBuscar.nativeElement.value;

    console.log(this.txtBuscar);
    //limpio el formulario 
    this.txtBuscar.nativeElement.value = "";
  }
}
