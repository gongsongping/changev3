import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import axios from 'axios';
import { Login } from '../login/login';
import { JwtHelper } from 'angular2-jwt';
import { About } from '../about/about';
import { Consultant } from '../consultant/consultant';
import { Servicecall } from '../servicecall/servicecall';
import { Visitrecord } from '../visitrecord/visitrecord';
import { Sellrecord } from '../sellrecord/sellrecord';
import { Message } from '../message/message';


@Component({
    selector: 'page-mine',
    templateUrl: 'mine.html'
})

export class Mine {
    login = Login;
    about = About
    consultant = Consultant
    servicecall = Servicecall
    visitrecord = Visitrecord
    sellrecord = Sellrecord
    message = Message

    items = [1, 2, 3, 4, 5];
    token: any;
    userInfo: any;
    messagesTotal:any = 0
    baseURL:any

    jwtHelper: JwtHelper = new JwtHelper();
    constructor(public navCtrl: NavController, public events:Events) { }

    ionViewWillEnter() {
        let vm = this
        if (localStorage.getItem('token')){
            this.token = localStorage.getItem('token')
        } else {
            this.token = ''
        }
        
        this.baseURL = axios.defaults.baseURL 
    }
  
    logout() {
        localStorage.setItem('token', '')
        this.token = ''
        delete axios.defaults.headers.common["Authorization"]
        this.events.publish('refresh:posts', 'user', 'time');
        // this.navCtrl.setRoot(MyApp)
        this.navCtrl.parent.select(0);
    }
    goTo(p){
        if (window.localStorage.getItem('tokens')){
            this.navCtrl.push(p)
        } else {
            this.navCtrl.push(Login)      
        }
    }

}
