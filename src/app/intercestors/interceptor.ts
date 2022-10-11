import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import Swal from "sweetalert2";


@Injectable({providedIn: 'root'})
export class InterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Paso por el interceptor');
        const headers =localStorage.getItem('auth')?.toString();
        if(headers){
            const reqClone = req.clone({
                headers: req.headers.set('Authorization', headers)
            });
            return next.handle(reqClone);
        }
        return next.handle(req).pipe(
            catchError(this.handlerError)
        );
    }
    //captura los errores desde el servidor
  private handlerError(err: any): Observable<never> {
    //let errorMessage = 'An error ocurred retrienving data';
    if (err.status == 410) {
      Swal.fire(
        'Error!',
        'User ya existe!',
        'error'
      )
    } if (err.status == 400) {
      Swal.fire(
        'Error!',
        'Usuario ya existe!',
        'error'
      )
    } if (err.status == 200) {
      Swal.fire(
        'succefull!',
        'success'
      ).then((result) => {
        if (result) {
          location.reload();
        }
      }, (err) => {
        Swal.fire('Error', 'No se puedo Eliminar contacto!!', 'error');
      })

      return throwError(err)
    } if (err.status == 404) {
      Swal.fire(
        'Error!',
        'no encontrado',
        'error'
      )
    }
    if (err.status == 452) {
      Swal.fire(
        'Error!',
        'Datos incorreectos',
        'error'
      )
    }

    //window.alert(errorMessage);
    return throwError(err)
  }
}


export const InterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
    
}
