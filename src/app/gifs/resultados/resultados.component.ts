import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent  {
  //Obtener resultados desde GifsService.resultados
  
  public get resultados() {
    return this.gifsService.resultados;
  }
  

  //inyectar el GifsService
  constructor( private gifsService: GifsService) { }

  

}
