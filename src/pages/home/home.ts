import {Component} from '@angular/core';

import {NavController, Events} from 'ionic-angular';
import axios from 'axios';
import {ImagePicker} from '@ionic-native/image-picker';

@Component({selector: 'page-home', templateUrl: 'home.html'})
export class Home {
  houses = [];
  start = 0;
  dataLength = 10;
  housesTotal : any;
  textTitle = 0;
  renting = [
    {
      textTitle: 0,
      title: '买房/卖房'
    }, {
      textTitle: 1,
      title: '租房/出租'
    }
  ]
  constructor(public navCtrl : NavController, public events : Events, private imagePicker : ImagePicker) {}
  loadMore(infiniteScroll) {
    let vm = this;
    let params = {
      params: {
        start: vm.start
      }
    }
    axios
      .get('/api/housing/houses?size=10&status=2', params)
      .then(function (res) {
        vm.houses = vm
          .houses
          .concat(res.data.data);
        vm.dataLength = res.data.data.length
        // vm.housesTotal = res.data.total
        vm.start = vm.start + 1
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      })
  }
  ionViewWillEnter() {
    //refresh token
    axios.defaults.baseURL = 'http://60.205.169.195:7060';

  }
  doRefresh(refresher) {
    this.houses = [];
    this.start = 0;
    this.dataLength = 10;
    this.loadMore(refresher)
  }
  ionViewDidLoad() {
    setTimeout(() => {
      this.loadMore(false)
    }, 1000)
  }

  imgPicker() {
    let options = {
      maximumImagesCount: 3,
      width: 800,
      height: 800,
      // quality of resized image, defaults to 100
      quality: 100,
      outputType: 0 //url
    };
    this
      .imagePicker
      .getPictures(options)
      .then((results) => {
        for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
        }
      }, (err) => {});
  }

  // 选项卡
  rentingClick(index) {
    this.textTitle = index.textTitle;
  }

  goBuy() {
    this
      .navCtrl
      .parent
      .select(1);
  }
}
