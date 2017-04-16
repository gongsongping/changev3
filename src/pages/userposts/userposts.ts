import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Postdetails } from '../postdetails/postdetails';

import axios from 'axios';
/**
 * Generated class for the Userposts page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-userposts',
  templateUrl: 'userposts.html',
})
export class Userposts {

    postdetails = Postdetails
    constructor(public navCtrl: NavController, public Params: NavParams) {
        this.post = this.Params.get('post')
    }
    post
    ionViewWillEnter() {
       this.loadMore(false)
    }

    posts = []; page = 0; lastId = 0; limit = 5; dataLength = 5
    loadMore(infiniteScroll) {
       let vm = this
        axios.get('/api/users/'+vm.post.user.id+'?page='+vm.page+'&lastId='+vm.lastId)
        .then(function(res) {
            vm.dataLength = res.data.posts.length
            vm.posts = vm.posts.concat(res.data.posts)
            vm.page += 1
            if (res.data.posts.length == vm.limit) {vm.lastId = res.data.posts[vm.limit-1].id}
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
        })   
    }
    pushTo(page, post) {
        this.navCtrl.push(page, { post: post })
    }

}
