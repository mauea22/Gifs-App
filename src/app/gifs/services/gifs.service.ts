import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '3RORMcKUgVguSvlh0q8tfl0OLH6CHjg8'
  private servicioUrl: string = 'http://api.giphy.com/v1/gifs'

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
    //cargar desde localStorage, se hace desde el constructor porque este se ejecuta la primera y única vez que el servicio sea llamado
    //si existe la key historial ???
    if(localStorage.getItem('historial')){
      //guardar en GifsService._historial el arreglo historial parseado a un objeto
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
    if(localStorage.getItem('resultadosImg')){
      this.resultados = JSON.parse(localStorage.getItem('resultadosImg')!);
    }
  }

  //método que captura la entrada del input
  buscarGifs( query:string){
    //que el dato ingresado no tenga espacios adelante ni atrás trim() y que se convierta a minúsculas para que luego no se repitan en mayúsculas y minúsculas toLowerCase()
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

    //parámetros de la url 
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit','10')
      .set('q', query);

    //hacer la consulta a la API con el service httpClient entre backtick
    //SearchGifsResponse es la interface creada con https://app.quicktype.io/ de la respuesta JSON

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params}).subscribe( (resp: any) => {

      //almaceno en resultados la data de la respuesta a la petición
      this.resultados = resp.data;

      //obtener las imágenes en localStorage después de tener la respuesta
      localStorage.setItem('resultadosImg', JSON.stringify(this.resultados));
    });

  }

}
