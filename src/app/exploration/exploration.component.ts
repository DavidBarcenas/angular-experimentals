import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './components/projection/auth-form/auth-form.component';
import { AuthRememberComponent } from './components/projection/auth-remember/auth-remember.component';

@Component({
  selector: 'app-exploration',
  standalone: true,
  templateUrl: './exploration.component.html',
  styleUrl: './exploration.component.scss',
  imports: [CommonModule, AuthFormComponent, AuthRememberComponent],
})
export class ExplorationComponent {
  rememberMe = false;

  rememberUser(remember: boolean) {
    this.rememberMe = remember;
  }

  createUser(user: { email: string; password: string }) {
    console.log('[CREATE]', user, this.rememberMe);
  }

  loginUser(user: { email: string; password: string }) {
    console.log('[LOGIN]', user, this.rememberMe);
  }
}
