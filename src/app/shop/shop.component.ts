import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LogoComponent } from '../core/components/logo/logo.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LogoComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {}
