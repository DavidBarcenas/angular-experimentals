import { Component, output } from '@angular/core';

@Component({
  selector: 'app-auth-remember',
  standalone: true,
  imports: [],
  template: `
    <label [for]="uid">
      <input type="checkbox" [id]="uid" (change)="onChecked($event)" />
      keep me logged in
    </label>
  `,
  styleUrl: './auth-remember.component.scss',
})
export class AuthRememberComponent {
  checked = output<boolean>();
  uid = crypto.randomUUID();

  onChecked(event: Event) {
    const value = (event.target as HTMLInputElement).checked;
    this.checked.emit(value);
  }
}
