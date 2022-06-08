import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '3RORMcKUgVguSvlh0q8tfl0OLH6CHjg8'

  //propiedad privada que almacena los string (que vienen del input) en un array
  private _historial:string[] = [];

  //getter del array
  public get historial() {
    return [...this._historial];
  }

  //constructor para hacer consultas Http (importar HttpClient desde '@angular/common/http')
  constructor(private http: HttpClient){}

  //metodo que captura la entrada del input
  buscarGifs( query:string){
    //que el dato ingresado no tenga espacios adelante ni atras trim() y que se convierta a minusculas para que luego no se repitan en mayusculas y minusculas toLowerCase()
    query = query.trim().toLowerCase();

    //no tener repetidos en el array (si no existe en el array que haga el unshift)
    if (!this._historial.includes(query)) {
      //inserto el elemento al array _historial
      this._historial.unshift( query);

      //cortar el array _historial donde los elementos no se acumulan mas de 10
      this._historial = this._historial.splice(0,10);
    }
    
    //hacer la consulta a la API con el service httpClient 
    this.http.get('http://api.giphy.com/v1/gifs/search?api_key=3RORMcKUgVguSvlh0q8tfl0OLH6CHjg8&q=dragon ball z&limit=10').subscribe( (resp: any) => {
      console.log(resp.data);
    });

  }
  
}
