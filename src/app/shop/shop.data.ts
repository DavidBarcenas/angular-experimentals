import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './products/product.interface';
import { Review } from './reviews/review.interface';
import { ProductData } from './products/product.data';
import { ReviewData } from './reviews/review.data';

export class ShopData implements InMemoryDbService {
  createDb(): { products: Product[]; reviews: Review[] } {
    const products = ProductData.products;
    const reviews = ReviewData.reviews;
    return { products, reviews };
  }
}
