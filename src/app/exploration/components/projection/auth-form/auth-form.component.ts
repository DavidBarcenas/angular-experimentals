import { NgIf } from '@angular/common';
import { AfterContentInit, Component, ContentChild, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthRememberComponent } from '../auth-remember/auth-remember.component';

interface User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [FormsModule, NgIf],
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
      <p *ngIf="showMessage">You will be logged in for 30 days</p>
      <ng-content select="button" />
    </form>
  `,
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent implements AfterContentInit {
  @ContentChild(AuthRememberComponent) remember: AuthRememberComponent | undefined;
  submitted = output<User>();
  showMessage = false;

  ngAfterContentInit() {
    if (this.remember) {
      this.remember.checked.subscribe((checked) => (this.showMessage = checked));
    }
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }
}
