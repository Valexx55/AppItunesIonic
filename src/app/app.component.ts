import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { timer } from 'rxjs/observable/timer';
import { HomePage } from '../pages/home/home';
import { FavoritosService } from '../pages/favoritos/favoritos.service';
@Component({
  templateUrl: 'app.html', 
  providers: [FavoritosService]
})


export class MyApp {
  rootPage:any = HomePage;
  private showSplash : boolean;
  constructor(platform: Platform, statusBar: StatusBar, favs_service : FavoritosService) {
   
    this.showSplash = true; // <-- show animation
    timer(1900).subscribe(() => this.showSplash = false);
    platform.ready().then(() => {
      favs_service.cargarListaFavoritos().then((lista) => {
        FavoritosService.setListaFavoritos(lista);
    });
      statusBar.styleDefault();
    });
  }
}

