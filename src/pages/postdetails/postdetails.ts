import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Login } from '../login/login';
import { Userposts } from '../userposts/userposts';

import axios from 'axios';
declare var BMap: any;

/*
  Generated class for the Housedetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-postdetails',
    templateUrl: 'postdetails.html'
})
export class Postdetails {
    userposts = Userposts
    constructor(public navCtrl: NavController, public Params: NavParams) {
        this.post = this.Params.get('post')
    }
    post
    token
    ionViewWillEnter() {
       this.token = localStorage.getItem('token')
       this.loadMore(false)
    }

    comments = []; page = 0; lastId = 0; limit = 5; dataLength = 5
    loadMore(infiniteScroll) {
       let vm = this
        axios.get('/api/posts/'+vm.post.id+'?page='+vm.page+'&lastId='+vm.lastId)
        .then(function(res) {
            vm.dataLength = res.data.comments.length
            vm.comments = vm.comments.concat(res.data.comments)
            vm.page += 1
            if (res.data.comments.length == vm.limit) {vm.lastId = res.data.comments[vm.limit-1].id}
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
        })   
    }
    pushTo(page, post) {
        if ((page == this.userposts)&&(!this.token)){
            this.navCtrl.push(Login)
        } else {
            this.navCtrl.push(page, { post: post })
        }
    }

}


