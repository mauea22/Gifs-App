import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '3RORMcKUgVguSvlh0q8tfl0OLH6CHjg8'

  //propiedad privada que almacena los string (que vienen del input) en un array
  private _historial:string[] = [];

  //TODO: cambiar el tipo // el tipo Gif es la (data:) que viene desde interfaces, también hay que importarlo
  public resultados: Gif[] = [];

  //getter del array
  public get historial() {
    return [...this._historial];
  }

  //constructor para hacer consultas Http (importar HttpClient desde '@angular/common/http')
  constructor(private http: HttpClient){
    //cargar desde localStorage, se hace desde el constructor porque este se ejecuta la primera y unica vez que el servicio sea llamado
    //si existe la key historial ???
    if(localStorage.getItem('historial')){
      //guardar en GifsService._historial el arreglo hitorial parseado a un objeto
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
    if(localStorage.getItem('resultadosImg')){
      this.resultados = JSON.parse(localStorage.getItem('resultadosImg')!);
    }
  }

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

      //grabar en el localStorage
      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    //hacer la consulta a la API con el service httpClient entre backstick
    //SearchGifsResponse es la interface creada con https://app.quicktype.io/ de la respuesta JSON
    this.http.get<SearchGifsResponse>(`http://api.giphy.com/v1/gifs/search?api_key=3RORMcKUgVguSvlh0q8tfl0OLH6CHjg8&q=${ query }&limit=10`).subscribe( (resp: any) => {
      console.log(resp.data);
      //almaceno en resultados la data de la respuesta a la peticion
      this.resultados = resp.data;

      //obtener las imagenes en localStorage despues de tener la respuesta
      localStorage.setItem('resultadosImg', JSON.stringify(this.resultados));
    });

  }

}
