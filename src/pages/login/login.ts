import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: any;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public facebook: Facebook,
    public dataService: DataProvider,
    public loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    this.menuCtrl.enable(false);
  }

  login(): void{
    this.loading.present();
    this.facebook.login(['public_profile']).then((response) => {
      this.getProfile();
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Something went wrong, please try again later...',
        buttons: ['Ok']
      });
      this.loading.dismiss();
      alert.present();
    });

  }

  getProfile(): void{
    this.facebook.api('/me?fields=id,name,picture', ['public_profile']).then((response) => {
      console.log(response);
      this.dataService.fbid = response.id;
      this.dataService.username = response.username;
      this.dataService.picture = response.picture.data.url;
      this.menuCtrl.enable(true);
      this.loading.dismiss();
      this.navCtrl.setRoot('HomePage');
    },
    (err) => {
      console.log(err);
      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Something went wrong, please try again later...',
        buttons: ['Ok']
      });
      this.loading.dismiss();
      alert.present()
    }
  );

  }

}
