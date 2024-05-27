import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header-comp',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private _pageTitle: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updatePageTitle();
      });
    this.updatePageTitle();
  }

  get pageTitle(): string {
    return this._pageTitle;
  }

  set pageTitle(value: string) {
    this._pageTitle = value;
  }

  private updatePageTitle(): void {
    // Get the URL string
    const url = this.router.url;
    // Extract the last part of the URL
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    // Capitalize the first character
    this.pageTitle = lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  }
}
