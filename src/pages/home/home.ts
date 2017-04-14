import { Component } from '@angular/core';

import { NavController, Events } from 'ionic-angular';
import axios from 'axios';
import { Housedetails } from '../housedetails/housedetails';
import { Precise } from '../precise/precise';
import { Login } from '../login/login';

import { TestService } from '../../providers/services';

declare var BMap: any;
// declare var BMAP_ANIMATION_BOUNCE: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class Home {

//   doRefresh = function() {
//     // $state.go('tab.home', null, {reload: true})
//     // $window.location.reload(true)
//     $state.go($state.current, {}, {reload: true})
//     $broadcast('scroll.refreshComplete')
//   }

// })

// .controller('WriteCtrl', function($scope, $http, $state,$ionicHistory, $rootScope, $resource, Post, Qiniu) {
//   $rootScope.$broadcast('qiniuUPdate')
//   var hiddenPo = $resource($rootScope.baseUrl + '/api/hiddenposts/:id')
//   posts = []; page = 0; lastId = 0; limit = 5; dataLength = limit
//   loadMore = function() {
//     if (dataLength == limit){
//       hiddenPo.query({page: page, lastId: lastId})
//       .$promise.then(function(data) {
//         // console.log(JSON.stringify(data))
//         dataLength = data.length
//         posts = posts.concat(data)
//         //Stop the ion-refresher from spinning
//         page += 1
//         if (data.length == limit) {lastId = data[limit-1].id}
//         $broadcast('scroll.infiniteScrollComplete')
//       })
//       // $broadcast('scroll.infiniteScrollComplete')
//     }
//   }
    constructor(public navCtrl: NavController, private testService: TestService, public events: Events) { }
    
    token
    posts = []; page = 0; lastId = 0; limit = 5; dataLength = 5
    loadMore(infiniteScroll) {
       let vm = this
        vm.token = localStorage.getItem('token')
        let url
        if (vm.token){
            url = '/api/posts'
        } else {
            url = '/api/discoverposts'
        }
        //    '/api/discoverposts'
        axios.get(url+'?page='+vm.page+'&lastId='+vm.lastId)
        .then(function(res) {
            vm.dataLength = res.data.length
            vm.posts = vm.posts.concat(res.data)
            vm.page += 1
            if (res.data.length == vm.limit) {vm.lastId = res.data[vm.limit-1].id}
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
        })   
    }
    ionViewWillEnter() {
       
    }
    doRefresh(refresher) {
      let vm = this
      vm.posts = []; vm.page = 0; vm.lastId = 0; vm.limit = 5; vm.dataLength = 5
      this.loadMore(refresher)
    }
    ionViewDidLoad() {
        let vm = this
        
        this.events.subscribe('refresh:posts', (user, time) => {
            vm.posts = []; vm.page = 0; vm.lastId = 0; vm.limit = 5; vm.dataLength = 5
            vm.loadMore(false)
        });
        vm.events.publish('refresh:posts', 'user', 'time');
    }
    goDetail(h) {
        this.navCtrl.push(Housedetails, { house: h })
    }
    goPrecise() {
        if (window.localStorage.getItem('tokens')) {
            this.navCtrl.push(Precise)
        } else {
            this.navCtrl.push(Login)
        }
    }
   
    goBuy(){
      this.navCtrl.parent.select(1);
    }
}
