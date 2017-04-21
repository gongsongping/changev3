import {Component} from '@angular/core';
import {Platform, Events} from 'ionic-angular';
// import {StatusBar, Splashscreen} from 'ionic-native';
import { SplashScreen }  from  "@ionic-native/splash-screen"
import { StatusBar }  from  "@ionic-native/status-bar"

import { Tabs } from '../pages/tabs/tabs';
import axios from 'axios';



@Component({
  templateUrl: 'app.html'
  // template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = Tabs;
  userInfo:any
  constructor(platform : Platform,  public events: Events, splashScreen :SplashScreen, statusBar :StatusBar) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available. Here you can do
      // any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  //not working
  ionViewWillEnter() {
    console.log('----root app----- Page will enter');
  }
  //not working
  ionViewDidLoad() {
    console.log('----root app----- Page did load');
  }
  token
  ngOnInit(){
      // localStorage.setItem('baseURL', 'http://60.205.169.195:7060')
      axios.defaults.baseURL = 'http://162.243.143.15'  
      // axios.defaults.baseURL = 'http://changiif.com'
      // axios.defaults.baseURL = 'http://localhost:5000';

      this.events.subscribe('user:login', (user, time) => {
        console.log('----events refresh', user, 'at', time);
        let vm = this
        if (localStorage.getItem('token')) {
            vm.token = localStorage.getItem('token')
            console.log('------',localStorage.getItem('token'),vm.token)
            axios.defaults.headers.common['Authorization'] = "token =" + vm.token
        }
      });
      this.events.publish('user:login', 'user', 'time');
  }
  
  
}
