import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
                next: HttpHandler): Observable<HttpEvent<any>> {
        
        const tokenJWT = localStorage.getItem("tokenZTPAI");

        req = req.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + tokenJWT
            }
        });
        return next.handle(req);
    }
}