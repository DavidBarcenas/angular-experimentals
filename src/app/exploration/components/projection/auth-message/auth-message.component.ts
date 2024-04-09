import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-message',
  standalone: true,
  imports: [NgIf],
  template: `<p>You will be logged in for {{ days }} days</p>`,
  styles: '',
})
export class AuthMessageComponent {
  days = 7;
}
