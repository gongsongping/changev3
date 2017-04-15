import { NgModule, ErrorHandler, enableProdMode } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Tabs } from '../pages/tabs/tabs';
import { Buy } from '../pages/buy/buy';
import { Mine } from '../pages/mine/mine';
import { Login } from '../pages/login/login';
import { Postdetails } from '../pages/postdetails/postdetails';
import { Precise } from '../pages/precise/precise';
import { Userposts } from '../pages/userposts/userposts';

import { NestedCom, House, TestService, ImgPipe, HouseTypePipe, Distribution } from '../providers/services';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { SplashScreen }  from  "@ionic-native/splash-screen"
import { StatusBar }  from  "@ionic-native/status-bar"
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'


// let prodMode: boolean = window.hasOwnProperty('cordova');//!!window.cordova;
// ionicBootstrap(MyApp, [], {prodMode: prodMode});
// import {enableProdMode} from '@angular/core';
enableProdMode();

@NgModule({
  declarations: [
    MyApp,
    Home,
    Buy,
    Mine,
    Login,
    Postdetails,
    Precise,
    Tabs,
    ImgPipe,
    NestedCom,
    House,
    Distribution,
    HouseTypePipe,
    Userposts
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      backButtonText: ''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Buy,
    Mine,
    Login,
    Postdetails,
    Precise,
    Tabs,
    Userposts
  ],
  providers: [
    SplashScreen,
    StatusBar,
    { provide: ErrorHandler, useClass: IonicErrorHandler }, TestService]
})
export class AppModule { }
