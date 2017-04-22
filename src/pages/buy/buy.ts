import { Component, ViewChild, style, state, animate, transition, trigger } from '@angular/core';
import { NavController,Tabs, LoadingController } from 'ionic-angular';
import { Precise } from '../precise/precise';
import { Login } from '../login/login';
import axios from 'axios';
import { Housedetails } from '../housedetails/housedetails';

/*
  Generated class for the Buy page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html',
  animations: [
    trigger('transformInOut', [
      // state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        style({transform: 'translateY(-90%)'}),
        animate(300,style({transform: 'translateY(0)'}))
      ]),
      transition('* => void', [
        style({transform: 'translateY(0)'}),
        animate(200, style({transform: 'translateY(90%)'}))
      ])
    ]),
    trigger('heightInOut', [
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
      ]),
      transition('void => *', [
          style({ height: '0' }),
          animate(250, style({ height: '*' }))
      ])
    ]), 
    trigger('opacityInOut', [
      transition('* => void', [
        style({ opacity: 0 }),
        animate(250, style({ opacity: 1 }))
      ]),
      transition('void => *', [
          style({ opacity: 1 }),
          animate(250, style({ opacity: 0 }))
      ])
    ]) 
  ]
})
export class Buy {
  @ViewChild('myTabs') tabRef: Tabs;
  // userInfo:any;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {}
  
  ionViewDidLoad() {
    // this.tabRef.select(1);
    console.log('buy BuyPage didload');
    this.loadMore(false)
    this.loadMore(false)
    this.loadMore(false)
  }
  
  loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  spinner = false
  photos = []; page = 0; lastId = 0; limit = 5; dataLength = 5
  loadMore (infiniteScroll) {
      let vm = this
      vm.spinner = true 
      axios.get('/api/photos?page='+vm.page+'&lastId='+vm.lastId)
       .then(function(res) {
              // console.log(res.data.data)
            setTimeout(()=>{
               vm.spinner = false
            },500)  
            vm.photos = vm.photos.concat(res.data)
            vm.page += 1
            if (infiniteScroll) {
                infiniteScroll.complete();
            }

        })
  }

  doRefresh(refresher) {
    let vm = this
    vm.photos = []; vm.page = 0; vm.lastId = 0; vm.limit = 5; vm.dataLength = 5
    this.loadMore(refresher)
    this.loadMore(refresher)
    this.loadMore(refresher)
  }

}
