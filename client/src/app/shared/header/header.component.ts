import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HandleAuthService } from 'src/app/services/handle.services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor( private _translate: TranslateService,
               public _authService: HandleAuthService ) { }

  ngOnInit(): void {
  }

}
