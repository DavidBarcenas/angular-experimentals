import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import { ProductService } from '../service/product.service';
import { AsyncPipe, CurrencyPipe, NgClass } from '@angular/common';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgClass],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  @Input()
  set id(productId: number) {
    this.productService.productSelected(productId);
  }

  private productService = inject(ProductService);

  imageSelected = signal<string | undefined>(undefined);

  product$ = this.productService.product$.pipe(
    tap((product) => this.imageSelected.set(product.images[0])),
    catchError((error) => {
      this.errorMessage = error;
      return EMPTY;
    })
  );
  errorMessage = '';

  changeImage(image: string): void {
    this.imageSelected.set(image);
  }

  addToCart(product: any): void {}
}
