import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs'
import { timeout } from 'rxjs/operators';
import { environment } from 'environments/environment';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  /**
   * Crea una instancia de GeneralService.
   * @param {HttpClient} http
   * @param {SesionService} sesionService
   * @param {Device} device
   * @memberof GeneralService
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Se obtienen los encabezados de autenticacion
   * @private
   * @returns {HttpHeaders} Encabezados de sesion
   * @memberof GeneralService
   */
  private obtenerEncabezados() : HttpHeaders {
    return new HttpHeaders()
          .set('Content-Type', 'application/json');
  }

  /**
   * Hace un llamado GET
   * @template T
   * @param {string} url Url a la cual se hara el llamado
   * @param {true} [hasHeaders] si este valor esta en true se envían encabezados
   * @returns Observable con el llamado
   * @memberof GeneralService
   */
   get<T>( url: string, hasHeaders = true, options:any = {} ): Observable<any> {
    const payload = {
      ...options
    };
    if ( hasHeaders ){
      const headers = this.obtenerEncabezados();
      payload['headers'] = headers;
    }
    return this.http.get<T>(`${API.url_api}/${url}`, payload );
  }

  /**
   * Hace un llamado POST
   * @template T
   * @param {string} url Url a la cual se hara el llamado
   * @param {*} model Parametros
   * @param {HttpParams} [params] Parametros HTTP
   * @returns Observable con el llamado
   * @memberof GeneralService
   */
  post<T>(url: string, model: any , params?: HttpParams) {
    const headers = this.obtenerEncabezados();
    return this.http.post<T>(`${API.url_api}/${url}`, model, { headers, params });
  }

  public put<T>(url: string, model?:any, params?:HttpParams): Observable<any> {
    const headers = this.obtenerEncabezados();
    return this.http.put<T>(`${API.url_api}/${url}`, model, { headers, params });
  }
}
