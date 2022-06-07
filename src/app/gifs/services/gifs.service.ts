import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  //propiedad privada que almacena los string (que vienen del input) en un array
  private _historial:string[] = [];

  //getter del array
  public get historial() {
    return [...this._historial];
  }

  //metodo que captura la entrada del input
  buscarGifs( query:string){
    //que el dato ingresado no tenga espacios adelante ni atras y que se convierta a minusculas para que luego no se repitan en mayusculas y minusculas
    query = query.trim().toLowerCase();

    //no tener repetidos en el array (si no existe en el array que haga el unshift)
    if (!this._historial.includes(query)) {
      //agrego el elemento al array _historial
      this._historial.unshift( query);

      //cortar el array _historial donde los elementos no se acumulan mas de 10
      this._historial = this._historial.splice(0,10);
    }

  }
  
}
