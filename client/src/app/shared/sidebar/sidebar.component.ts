import { Component, OnInit } from '@angular/core';
import { HandleAuthService } from 'src/app/services/handle.services.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(public _authService: HandleAuthService) { }

  ngOnInit(): void {
  }

}
