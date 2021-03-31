import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('login')) {
      return next.handle(request);
    }
    return this.attachAuthHeaderAndResumeCall(request, next) as Observable<HttpEvent<any>>;
  }

  private attachAuthHeaderAndResumeCall(req, next) {
    const token = localStorage.getItem('token');
    const tokenized = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(tokenized).pipe(
      // hide loader when request completes in success
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // this.loaderService.hide();
        }
      }),
      catchError(error => {
        // hide loader if request completes in error
        // this.loaderService.hide();
        this.handleRequestError(error);
        return of(error);
      }) as any);
  }

  private handleRequestError(err: HttpErrorResponse): Observable<any> {
    switch (err.status) {
      case 400: // BAD_REQUEST
        this.toastr.error(err.error.message);
        return of(err.message);
      case 401: // UNAUTHORISED
        this.toastr.error('Please try again or reload the page!', 'Something went wrong.', {disableTimeOut: true});
        // this.authService.logout();
        return of(err.message);
      case 403: // FORBIDDEN
        this.toastr.error('You are not authorised to access this application.', 'Error', {disableTimeOut: true});
        // this.authService.logout();
        return of(err.message);
      case 404: // PAGE_NOT_FOUND
        this.toastr.error('Please try again or reload the page!', 'Something went wrong.', {disableTimeOut: true});
        return of(err.message);
      case 500: // INTERNAL_SERVER_ERROR
        this.toastr.error('Please try again or reload the page!', 'Something went wrong.', {disableTimeOut: true});
        return of(err.message);
      default: // GENERIC_ERROR
        this.toastr.error('You are not authorised to access this application.', 'Error Occurred', {disableTimeOut: true});
        // this.authService.logout();
        return of(err.message);
    }
  }
}
