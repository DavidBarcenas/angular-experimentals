import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
      <ng-content select="h3" />
      <label>
        Email address
        <input type="email" name="email" ngModel />
      </label>
      <label>
        Password
        <input type="password" name="password" ngModel />
      </label>
      <ng-content select="app-auth-remember" />
      <ng-content select="button" />
    </form>
  `,
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  submitted = output<User>();

  onSubmit(value: User) {
    this.submitted.emit(value);
  }
}
