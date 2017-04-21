import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import axios from 'axios';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class Login {
    email: any;
    name: any;
    password: any;
    loginErr: any;
    sign = 'signin'
    constructor(public navCtrl: NavController, public events:Events) { }

    ionViewWillEnter() {
        console.log('---- LoginPage Page will enter-----',this.navCtrl.parent);
    }
    ngOnInit(){
        console.log('----- LoginPage Page oninit------');
    }
    
    signInData = {email:'', password:''}
    login() {
        let vm = this
        // let data = `email=${vm.email}&password=${vm.password}`
        axios({
            method: 'post',
            url:'/api/session',
            data: vm.signInData
        }).then(function (res) {
                if (!res.data.token){alert(res.data); return}
                localStorage.setItem('token', res.data.token)
                axios.defaults.headers.common['Authorization'] = "token =" + res.data.token
                vm.events.publish('refresh:posts', 'user', 'time');
                vm.navCtrl.pop()
            })
            .catch(function (error) {
                alert('邮箱或密码错误');
                console.log(error);
            });
    }
    signUpData = {email:'',name:'',password:'',password_confirmation:''}
    signUp() {
        let vm = this
        // let data = `email=${vm.email}&password=${vm.password}`
        axios({
            method: 'post',
            url:'/api/users',
            data: vm.signUpData
        }).then(function (res) {
                if (!res.data.token){alert(res.data); return}            
                localStorage.setItem('token', res.data.token)
                axios.defaults.headers.common['Authorization'] = "token =" + res.data.token
                vm.events.publish('refresh:posts', 'user', 'time');
                vm.navCtrl.pop()
            })
            .catch(function (error) {
                alert(error);
                console.log(error);
            });
    }

}
