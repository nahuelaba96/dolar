import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dolar, Dolar_Hoy } from './interface/dolar.interface';

@Injectable({
  providedIn: 'root'
})
export class DolarService {

  private baseUrl: string = 'https://api.bluelytics.com.ar/v2';

  constructor( private http: HttpClient ) {}

  getDolar(): Observable<Dolar> {
      return this.http.get<Dolar>(`${ this.baseUrl }/latest`)
  }

  getDolarYesterday(): Observable<Dolar_Hoy[]> {
    return this.http.get<Dolar_Hoy[]>(`${ this.baseUrl }/evolution.json`)
}

}
