import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import axios from 'axios';
/*
  Generated class for the Precise page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({selector: 'page-precise', templateUrl: 'precise.html'})
export class Precise {

    constructor(public navCtrl : NavController) {}

    posts = []; page = 0; lastId = 0; limit = 5; dataLength = 5
    loadMore(infiniteScroll) {
        let vm = this
        let url = '/api/hiddenposts'
        axios.get(url + '?page=' + vm.page + '&lastId=' + vm.lastId)
            .then(function (res) {
                vm.dataLength = res.data.length
                vm.posts = vm.posts.concat(res.data)
                vm.page += 1
                if (res.data.length == vm.limit) {
                    vm.lastId = res.data[vm.limit - 1].id
                }
                if (infiniteScroll) {
                    infiniteScroll.complete();
                }
            })
    }
    ionViewWillEnter() {}

    ionViewDidLoad() {
        this.loadMore(false)        
    }
    onFileChange(e) {
        console.log(e.target.files[0])
    }

}
