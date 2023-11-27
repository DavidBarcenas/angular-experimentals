import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  handleError(error: HttpErrorResponse): Observable<never> {
    const formattedMessage = this.formatError(error);
    return throwError(() => formattedMessage);
  }

  formatError(err: HttpErrorResponse): string {
    return this.httpErrorFormatter(err);
  }

  private httpErrorFormatter({ error, status, statusText }: HttpErrorResponse): string {
    // send the error to some remote logging infrastructure
    let errorMessage = '';
    if (error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `An error occurred: ${error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${status}, error message is: ${statusText}`;
    }
    return errorMessage;
  }
}
