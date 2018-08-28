import { Injectable } from "@angular/core";

import { SearchItem } from 'itunes-ionic';

import { Storage } from '@ionic/storage';

@Injectable()
export class FavoritosService {
    //Servicio para gestionar los favoritos de itunes en tu app
    //Variables locales al servicio
    private static lista_favs: SearchItem[];            //Array de canciones favoritas

    private static readonly CLAVE_STORAGE_LISTA_FAVS: string = "lista_favs";

    /**
     * 
     * @param storage Servicio de persistencia
     */
    constructor(public storage: Storage) {


    }

    public static getListaFavoritos(): SearchItem[] {
        return FavoritosService.lista_favs;
    }

    public static setListaFavoritos(lista_f : SearchItem[]): void {
        FavoritosService.lista_favs  = lista_f;
    }

    public cargarListaFavoritos (): Promise<SearchItem[]>
    {
        return this.storage.get(FavoritosService.CLAVE_STORAGE_LISTA_FAVS);
    }

    public esCancionFavorita(cancion: SearchItem): boolean {
        let cancion_fav: boolean = false;
        let indice: number = 0;

        while (!cancion_fav && (indice < FavoritosService.lista_favs.length)) {
            cancion_fav = (cancion.trackId == FavoritosService.lista_favs[indice].trackId);
            indice = indice + 1;
        }

        return cancion_fav;
    }

    public eliminarFavorito(miTrackId: number) {

        console.log("Elimnar de favoitos");
        FavoritosService.lista_favs = FavoritosService.lista_favs.filter(obj => obj.trackId !== miTrackId);
        this.storage.set(FavoritosService.CLAVE_STORAGE_LISTA_FAVS, FavoritosService.lista_favs);
    }

    public agregarFavorito(miCancion: SearchItem) {

        console.log("Añadir a favoritos");
        let l_mod: boolean = false;//controlar que la lista ha sido modificada

        if (FavoritosService.lista_favs == null) {
            FavoritosService.lista_favs = [miCancion];
            l_mod = true;
        }
        else if (!this.esCancionFavorita(miCancion)) {
            console.log("Canción favorita nueva: se añade a la colección");
            FavoritosService.lista_favs[FavoritosService.lista_favs.length] = miCancion;
            l_mod = true;

        }

        if (l_mod) {
            this.storage.set(FavoritosService.CLAVE_STORAGE_LISTA_FAVS, FavoritosService.lista_favs);
        }

        console.log("lista motificada = " + l_mod);

    }
}