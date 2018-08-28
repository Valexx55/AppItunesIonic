import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { SearchItem } from 'itunes-ionic';
import { FavoritosService } from './favoritos.service'

@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
  providers: [FavoritosService]
})
export class FavoritosPage {

 
  private lista_favoritos: SearchItem[];      //Mi lista de favoritos
  private loading: Loading;


  //constructor e inicializacion de variables
  //---------------------------------------------//

  //Cargo el listado existente en el storage para inicializar mis favoritos
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private servicioListaFavoritos: FavoritosService) {

      this.lista_favoritos = FavoritosService.getListaFavoritos();
    
  }

  ionViewDidEnter() {
      this.lista_favoritos = FavoritosService.getListaFavoritos();
      
      if (this.lista_favoritos!=null)
      {
        this.lista_favoritos.forEach(function (cancion){
          cancion.estado = "play";
        });
      }

      
    
  }



  public reproducirCancion (cancion: SearchItem) : void
  {
    if (cancion.seleccionada) {
      let audioElement = document.getElementById('' + cancion.trackId);
      console.log("audioElement " + audioElement);
      audioElement['pause']();
      cancion.seleccionada = false;
      cancion.estado = 'play';

    } else // canción no seleccionada
    {
      let audioElement = document.getElementById('' + cancion.trackId);
      console.log("audioElement " + audioElement);
      audioElement['play']();
      audioElement.onended = function () {
        cancion.seleccionada = false;
        cancion.estado = 'play';
      };
      cancion.seleccionada = true;
      cancion.estado = 'pause';

    }
  }


  public borrarCancionDeFavoritos(cancion: SearchItem): void {
    //Borro el elemento elegido del listado y del fichero
    console.log("Eliminar canción de favoritos: " + cancion.trackName);

    this.servicioListaFavoritos.eliminarFavorito(cancion.trackId);
    this.lista_favoritos = FavoritosService.getListaFavoritos();//actualizo visto

  }

} 
