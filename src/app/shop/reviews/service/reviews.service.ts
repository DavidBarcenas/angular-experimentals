import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private reviewsUrl = 'api/reviews';

  getReviewUrl(productId: number): string {
    return this.reviewsUrl + '?productId=^' + productId + '$';
  }
}
