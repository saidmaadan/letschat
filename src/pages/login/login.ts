import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, MenuController, AlertController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public facebook: Facebook,
    public dataService: DataProvider
  ) {
    this.menuCtrl.enable(false);
  }

  login(): void{
    this.getProfile();
  }

  getProfile(): void{
    this.menuCtrl.enable(true);
    this.navCtrl.setRoot('HomePage')
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
