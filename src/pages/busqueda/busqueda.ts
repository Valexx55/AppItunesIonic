import { Component, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, NavParams, Slides, Keyboard, Loading } from 'ionic-angular';
import { SearchItem, BusquedaInterface } from 'itunes-ionic';
import { FavoritosService } from '../favoritos/favoritos.service';
import { Renderer } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the BusquedaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
  providers: [FavoritosService]
})
export class BusquedaPage implements AfterViewInit {

  static LIMITE: number = 20;
  private termino: string;
  private lista_canciones: SearchItem[];

  @ViewChild('mySlider') slider: Slides;
  selectedSegment: string;
  slides: any;
  tabBarElement: any;
  private lc : Loading;

  constructor(private toastc : ToastController, private renderer: Renderer, private teclado: Keyboard, public navCtrl: NavController, @Inject('BusquedaInterface') public itunes_service: BusquedaInterface, public fav_service: FavoritosService, public loadingCtrl: LoadingController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.selectedSegment = 'cards';
    this.slides = [
      {
        id: "cards",
        title: "Second Slide"
      },
      {
        id: "cubos",
        title: "Third Slide"
      },
      {
        id: "desliz",
        title: "First Slide"
      },
    ];

    

  }

  ngAfterViewInit() {
    this.slider.lockSwipes(true);
  }

  onSegmentChanged(segmentButton) {
    this.selectedSegment = segmentButton.value;
    console.log("Segment changed to", segmentButton.value);
    const selectedIndex = this.slides.findIndex((slide) => {
      return slide.id === segmentButton.value;
    });
    this.slider.slideTo(selectedIndex);

  }

  cambioSlide() {
    console.log('Slide changed');
    let currentSlide = this.slider.getActiveIndex();
    this.selectedSegment = this.slides[currentSlide].id;
  }

  /** 
   * Método invocado para informar al usuario en dos supuestos:
   * 
   * Que no haya conexión
   * QUe la búsqueda sea infructuosa (cero resultados)
  */
  private infoSinResultados (): void
  {
    let toast = this.toastc.create({
      message: 'Sin resultados',
      duration: 2000,
      position: 'bottom'
    });
  
    toast.present();
  }

  /**
   * Método que cierra el teclado virtual
   * 
   * @param eventox el evento que se propaga tras darle a la lupa (buscar)
   */
  private cerrarTeclado (eventox):void{
    this.renderer.invokeElementMethod(eventox.target, 'blur');
    this.teclado.close();
  }

  private  muestraEspera () : void{
    this.lc = this.loadingCtrl.create({
      content: 'Buscando ...',
      spinner: 'bubbles'
    });
    this.lc.present();
  }

  private cierraEspera (): void{
    this.lc.dismiss();
  }
  buscar(evento) {
    
    this.cerrarTeclado(evento);
    this.muestraEspera();
    console.log("evento" + evento);
    console.log("termino" + this.termino);
    this.lista_canciones = null;//vacío la lista cuando le da a buscar...
    this.itunes_service.busca(this.termino, BusquedaPage.LIMITE).subscribe(
      ok => {
        this.cierraEspera();
        console.log("RESULTADO BUSQEUDA =" + ok);
        this.lista_canciones = <SearchItem[]>ok.results;
        if ((this.lista_canciones == null) || (this.lista_canciones.length==0))
        {
          this.infoSinResultados();
        } else {
          console.log("RESULTADO cacniones =" + this.lista_canciones);
          this.lista_canciones.forEach(cancion => {
          cancion.seleccionada = false;
          cancion.favorita = this.fav_service.esCancionFavorita(cancion);
          cancion.estado = "play";//se ve el play
          cancion.estadofav = cancion.favorita ? "star" : "star-outline";//se ve el iocono vacío
        }
        );

        }
        
      }, 
      ko =>  {
        this.cierraEspera();
        this.infoSinResultados();
       }
    );
  }

  playMuestra(cancion: SearchItem) {
    //    document.getElementById("muestra").src = muestraCancion;
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

  favorito(cancion: SearchItem) {
    console.log("HA DADO A FAVORITO")
    if (cancion.favorita) {
      this.fav_service.eliminarFavorito(cancion.trackId);
      cancion.favorita = false;
      cancion.estadofav = 'star-outline';
    }
    else {
      this.fav_service.agregarFavorito(cancion);
      cancion.favorita = true;
      cancion.estadofav = 'star';

    }
  }

  ionViewDidEnter() {
    if (this.lista_canciones != null && this.lista_canciones.length > 0) {
      this.lista_canciones.forEach(cancion => {
        cancion.seleccionada = false;
        cancion.favorita = this.fav_service.esCancionFavorita(cancion);
        cancion.estado = "play";//se ve el play
        cancion.estadofav = cancion.favorita ? "star" : "star-outline";//se ve el iocono vacío
      }

      );
    }
  }
  /*
    ionViewWillEnter() {
      this.tabBarElement.style.display = 'none';
    }
  
    ionViewWillLeave() {
      this.tabBarElement.style.display = 'flex';
    }
  
    takeMeBack() {
      this.navCtrl.parent.select(0);
    }*/
}

