import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../shared/components/logo/logo.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgForOf, RouterLink, LogoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  title = 'angular-labs';
  pills = [
    { title: 'Shop', link: '/shop' },
    { title: 'Task list', link: '/tasks' },
    { title: 'UI Components', link: '/ui-components' },
    { title: 'Exploration', link: '/exploration' },
    { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' },
  ];
}
