import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController, AlertController, Platform } from '@ionic/angular';
import { Auth, Hub } from 'aws-amplify';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private platform: Platform,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    const listener = (data: any) => this.setToken();
    Hub.listen('auth', listener);
  }

  get isWeb(): boolean {
    return !this.platform.is('cordova');
  }
  private getJwtToken(): Promise<any> {
    return Auth.currentSession()
      .then((session) => session.getIdToken().getJwtToken())
      .catch((err) => console.log(err));
  }

  public setToken() {
    this.getJwtToken().then((token) => {
      sessionStorage.setItem('authorization', token);
    });
  }
  async signOut() {
    try {
      sessionStorage.removeItem('authorization');
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
}
