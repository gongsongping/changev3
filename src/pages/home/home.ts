import { Component } from '@angular/core';

import { NavController, Events } from 'ionic-angular';
import axios from 'axios';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class Home {
    houses = [];
    start = 0;
    dataLength = 10;
    housesTotal: any;
    textTitle = 0;
    renting = [
       {
          textTitle:0, 
          title:'买房/卖房'
       },
       {
          textTitle:1, 
          title:'租房/出租'
       }
    ] 
    constructor(public navCtrl: NavController, public events: Events) { }
    loadMore(infiniteScroll) {
        let vm = this;
        let params = {
            params: {
                start: vm.start
            }
        }
        axios.get('/api/housing/houses?size=10&status=2', params)
            .then(function (res) {
                vm.houses = vm.houses.concat(res.data.data);
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
        setTimeout(()=>{
          this.loadMore(false)
        },1000)
    }
  
    // 选项卡
    rentingClick(index){
        this.textTitle = index.textTitle;
    }

    goBuy(){
      this.navCtrl.parent.select(1);
    }
}
