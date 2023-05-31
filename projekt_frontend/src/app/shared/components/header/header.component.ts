import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  pageTitle: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  updateHeaderTitle() {
    let currentRoute = this.route;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }
    this.pageTitle = currentRoute.snapshot.data['title'];
  }

  ngOnInit() {
    this.updateHeaderTitle();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateHeaderTitle();
      }
    });
  }
}
