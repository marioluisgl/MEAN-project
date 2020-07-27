import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HandleSharedService } from './../../../services/handle.services.service';
import { GlOBAL_CONFIG } from './../../../core/configs/config';


@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  public toSelect: boolean;
  public showLangMenu: boolean;
  public selected: string;
  public languagesDynamic: string[];
  private _languages: string[];

  constructor( private _translate: TranslateService,
               private _sharedStoreService: HandleSharedService
               ) { }

  ngOnInit(): void {
    this._languages = GlOBAL_CONFIG.LANGUAGES;
    this._sharedStoreService.currentLanguage$.subscribe((lang: string) => {
      const value = lang || this._translate.currentLang;
      this.toSelect = false;
      this.selected = value;
      this._translate.use(value);
      this.showLangMenu = true;
      this.languagesDynamic = [];
      this._organizeLanguages(this.selected);
    });
   
  }

  // para crear las banderas de manera progresiva
  public getStyle(count: number): { top: string, 'margin-top': string, 'animation-delay': string, '-webkit-animation-delay': string, padding: number } {
    const style = {
      'top': '',
      'margin-top': '',
      'animation-delay': '',
      '-webkit-animation-delay': '',
      'padding': 0
    };
    style['top'] = 25 * (count + 1) + 'px'; // lo crea uno debajo de otro
    style['margin-top'] = -26 * (count + 1) + 'px'; // los coloca momentaneamente superpuestos, para despues animarlos
    style['animation-delay'] = 0.1 + count / 9 + 's';
    style['-webkit-animation-delay'] = 0.1 + count / 9 + 's';
    return style;
  };

  public selectLanguage(value: string) {
    this._sharedStoreService.changeCurrentLanguageSource(value);
  }


  public displayLanguages() {
    this.toSelect = true;
  }

  private _organizeLanguages(selected: string) {
    this.languagesDynamic = this._languages.filter(value => value !== selected);
  }

}
