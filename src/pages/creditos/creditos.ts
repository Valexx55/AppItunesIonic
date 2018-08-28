import { Component,ViewChild } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Companeros } from "./creditos.model";
import { List } from "ionic-angular";
import { FavoritosService } from "../favoritos/favoritos.service";

@Component({
  selector: "creditos",
  templateUrl: "creditos.html",
  providers: [FavoritosService]
})
export class CreditosComponent {

  private visible_pascua : boolean;

  private caltongif : string;

  private foto_empresa : string;
  private texto_cam : string;
  private url_cftic : string;
  
  private gente : Companeros [];
  private clicks : number;
  constructor( servicio_favoritos : FavoritosService) {

    console.log ("constructor");
    this.texto_cam = "Esta aplicación ha sido desarrolla en el ámbito de una actividad formativa promovida por el Centro de Formación en Tecnologías de la Información"
    this.url_cftic = "https://cftic.centrosdeformacion.empleo.madrid.org/"
    this.clicks = 0;
    this.visible_pascua = false;
    this.foto_empresa = "assets/imgs/logo_CAS_noBackground.JPG";
    //this.caltongif = "assets/imgs/iTunes.gif"
    this.gente = [
      {
        nombre: "Angel J. Cachón",
        github: "https://github.com/acachon",
        linkedin: "https://www.linkedin.com/in/angelcachon/",
        image: "assets/imgs/cachon.png"
      },
      {
        nombre: "Angel Fernández",
        github: "https://github.com/antroxu",
        linkedin: "https://www.linkedin.com/in/ángel-fernández-álvarez-60083521",
        image: "assets/imgs/angel.jpeg"
      },
      {
        nombre: "Amaya Valdiviejas",
        github: "https://github.com/amaya1234",
        linkedin: "https://es.linkedin.com/in/amaya-valdiviejas-ruiz-3696869b",
        image: "assets/imgs/foto_amaya.png"
      },
      {
        nombre: "Carlos Moreno",
        github: "https://github.com/cmcarlos",
        linkedin:'https://www.linkedin.com/in/carlos-moreno-c%C3%A1mara-70222a48/',
        image: "assets/imgs/foto_carlos.jpg"
      },
      {
        nombre: "Daniel Adrián",
        github: "https://github.com/DanielFrontEnd19",
        linkedin: "https://www.linkedin.com/in/frontenddanieladri%C3%A1n/",
        image: "assets/imgs/daniel.jpeg"
      },
      {
        nombre: "David Herrera",
        github: "https://github.com/daher7",
        linkedin: "https://www.linkedin.com/in/david-herrera-torrado-771083166/",
        image: "assets/imgs/david.jpeg"
      },
      {
        nombre: "Elena Jarabo",
        github: "https://github.com/keova",
        linkedin: "https://www.linkedin.com/in/elena-jarabo-ruiz/",
        image: "assets/imgs/elena.png"
      },
      {
        nombre: "Jose C. Calzada",
        github: "https://github.com/ixtab/",
        linkedin: "www.linkedin.com/in/jose-carlos-calzada-gomez",
        image: "assets/imgs/josec.jpeg"
      },
      {
        nombre: "Juan Madrigal",
        github: "https://github.com/Skattspa",
        linkedin: "https://www.linkedin.com/in/jmvergel/",
        image: "assets/imgs/foto_juan.png"
      },
      {
        nombre: "Luis Martínez",
        github: "https://github.com/ITLuisMC",
        linkedin: "https://www.linkedin.com/in/itluismc/",
        image: "assets/imgs/luismz.png"
      },
      {
        nombre: "Manuel J. Moreno",
        github: "https://github.com/manuelazo30",
        linkedin: "https://www.linkedin.com/in/manuelazo/",
        image: "assets/imgs/manuel.jpeg"
      },
      {
        nombre: "Oscar Rivera",
        github: "https://github.com/Oscarriveragit",
        linkedin: "https://www.linkedin.com/oscarriverayunquera",
        image: "assets/imgs/oscar.jpeg"
      },
      {
        nombre: "Obdulia Zamora",
        github: "https://github.com/ozamgmam",
        linkedin: "https://www.linkedin.com/in/obdulia-zamora-dom%C3%A9nech-081a4742/",
        image: "assets/imgs/obdulia.jpeg"
      }      
];
    
    this.mostrar(this.gente);
  }
  
  mostrar (gente){
    console.log(gente);
    
  }

  huevoPascua(){
    console.log("click logo");
    this.clicks = this.clicks + 1;
    if (this.clicks == 3){
      console.log("logo visible logo");
      this.mostrarGif();
      this.cleanClicks();
    } 
  }

  cleanClicks(){
    this.clicks = 0;
    
  }

  mostrarGif() {
    this.visible_pascua = true;
    let audioElement = document.getElementById('carlton');
    console.log("audioElement " + audioElement);
    //this.caltongif="https://raw.githubusercontent.com/Valexx55/AngularItunes/master/iTunes.gif?"+new Date().getTime();
    this.caltongif="assets/imgs/iTunes.gif?"+new Date().getTime();
    audioElement['play']();
    audioElement.onended = () => {
      this.caltongif="";//assets/imgs/iTunes.gif
      this.visible_pascua = false;

    }

  }

}