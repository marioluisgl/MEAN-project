import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';


export class HandleSharedService {

  private currentLanguageSource: BehaviorSubject<string>;
  currentLanguage$: Observable<string>;

    constructor() {
    const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
    this.currentLanguageSource = new BehaviorSubject<string>(lang);
    this.currentLanguage$ = this.currentLanguageSource.asObservable();
  }

  /**
   * Actualiza el idioma seleccionado
   */
  changeCurrentLanguageSource(value: string) {
    this.currentLanguageSource.next(value);
    localStorage.setItem('lang', value);
  }

  /**
   * Devuelve el valor del idioma seleccionado
   */
  public getCurrentLanguageSource() {
    return this.currentLanguageSource.getValue();
  }
}
