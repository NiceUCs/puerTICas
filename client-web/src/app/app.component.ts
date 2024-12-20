import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Auth, Hub } from 'aws-amplify';
import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@core';
import { I18nService } from '@app/i18n';
import { Platform } from '@ionic/angular';

const log = new Logger('App');

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private i18nService: I18nService,
    private platform: Platform
  ) {}

  ngOnInit() {
    // Setup logger

    if (environment.production) {
      const listener = (data: any) => this.setToken();
      Hub.listen('auth', listener);
      Logger.enableProductionMode();
    }
    const listener = (data: any) => this.setToken();
    Hub.listen('auth', listener);

    log.debug('init');

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);
    const onNavigationEnd = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        switchMap((route) => route.data),
        untilDestroyed(this)
      )
      .subscribe((event) => {
        const title = event.title;
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });
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

  get isWeb(): boolean {
    return !this.platform.is('cordova');
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }
}
