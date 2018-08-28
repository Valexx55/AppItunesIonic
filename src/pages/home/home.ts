import { Component, Inject, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { BusquedaObservableService, BusquedaInterface, SearchItemReducido, SearchItem } from 'itunes-ionic';
import { CreditosComponent } from '../creditos/creditos';
import { BusquedaPage } from '../busqueda/busqueda';
import { FavoritosPage } from '../favoritos/favoritos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [{provide: 'BusquedaInterface', useClass: BusquedaObservableService}]
})
export class HomePage {

  icons
  private termino:string;
  private resultados : SearchItem[];

  @ViewChild('mySlider') slider: Slides;
  selectedSegment: string;
  slides: any;

  tab1Root = CreditosComponent;
  tab2Root = BusquedaPage;
  tab3Root = FavoritosPage;

  constructor(public navCtrl: NavController,@Inject('BusquedaInterface') public itunes_service:BusquedaInterface) {
    this.selectedSegment = 'cards';
    this.slides = [
      {
        id: "cards",
        title: "First Slide"
      },
      {
        id: "cubos",
        title: "Second Slide"
      },
      {
        id: "desliz",
        title: "Third Slide"
      }
    ];
  }

  onSegmentChanged(segmentButton) {
    console.log("Segment changed to", segmentButton.value);
    const selectedIndex = this.slides.findIndex((slide) => {
      return slide.id === segmentButton.value;
    });
    this.slider.slideTo(selectedIndex);
  }

  onSlideChanged(slider) {
    console.log('Slide changed');
    const currentSlide = this.slides[slider.activeIndex];
    this.selectedSegment = currentSlide.id;
}

  buscar(evento)
  {
    console.log ("evento" + evento);
    console.log ("termino" + this.termino);
    this.itunes_service.busca(this.termino).subscribe (
      ok => {
        console.log (ok);
        this.resultados = <SearchItem[]>ok.results;
        console.log (this.resultados);
          }
    )
  }



}
