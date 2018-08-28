import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Keyboard } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { CreditosComponent } from '../pages/creditos/creditos';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { BusquedaPage } from '../pages/busqueda/busqueda';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreditosComponent,
    FavoritosPage,
    BusquedaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreditosComponent,
    FavoritosPage,
    BusquedaPage
  ],
  providers: [
    StatusBar,
    Keyboard,
   // SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
