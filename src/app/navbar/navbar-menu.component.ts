import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './navabar-menu.component.html',
})
export class NavMenuComponent implements OnInit {
  isCollapsed: boolean;
  isMenuVisible:boolean=false;
  constructor(private route:Router) {
    this.isCollapsed = true;
  }

  ngOnInit() {
  }
  ngDoCheck(): void {
    let currentroute = this.route.url;
    if (currentroute == '/login' ||currentroute == '/sign-up' ) {
      this.isMenuVisible = false
    } else {
      this.isMenuVisible = true
    }
  }

  collapseNavMenu() {
    if (!this.isCollapsed) {
      this.isCollapsed = !this.isCollapsed;
    }
  }
}