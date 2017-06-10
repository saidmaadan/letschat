import { Component, ViewChild } from "@angular/core";
import { Facebook } from '@ionic-native/facebook';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { DataProvider } from '../providers/data/data';
// import { LoginPage } from '../pages/login/login';
// import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  constructor(
    public platform: Platform,
    public dataService: DataProvider,
    public menuCtrl: MenuController,
    public status: StatusBar,
    public facebook: Facebook

  ) {
    platform.ready().then(() => {

    });
  }

  openPage(page): void{
    this.menuCtrl.close();
    this.nav.setRoot(page);

  }
  logout(): void{
    this.menuCtrl.close();
    this.menuCtrl.enable(false);
    this.nav.setRoot('LoginPage');
    this.dataService.fbid = null;
    this.dataService.username = null;
    this.dataService.picture = null;

    this.facebook.logout();

  }
}
