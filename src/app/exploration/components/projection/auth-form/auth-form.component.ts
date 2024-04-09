import { AfterContentInit, Component, ContentChild, ViewChild, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthRememberComponent } from '../auth-remember/auth-remember.component';
import { AuthMessageComponent } from '../auth-message/auth-message.component';

interface User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-auth-form',
  standalone: true,
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
      <app-auth-message [hidden]="!showMessage" />
      <ng-content select="button" />
    </form>
  `,
  styleUrl: './auth-form.component.scss',
  imports: [FormsModule, AuthMessageComponent],
})
export class AuthFormComponent implements AfterContentInit {
  @ViewChild(AuthMessageComponent) message: AuthMessageComponent | undefined;
  @ContentChild(AuthRememberComponent) remember: AuthRememberComponent | undefined;
  submitted = output<User>();
  showMessage = false;

  ngAfterContentInit() {
    if (this.message) {
      this.message.days = 30;
    }
    if (this.remember) {
      this.remember.checked.subscribe((checked) => (this.showMessage = checked));
    }
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }
}
