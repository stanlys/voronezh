import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API_KEY } from 'src/env';

@Injectable({ providedIn: 'root' })
export class daDataService {
  constructor(private _http: HttpClient) {}

  public address$ = new Subject<ISuggestions>();

  public getAddress(lat: number, lon: number): void {
    const result = this._http
      .post<ISuggestions>(
        'http://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address',
        { lat, lon },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Token ' + API_KEY,
          },
        }
      )
      .subscribe((v) => this.address$.next(v));
  }
}

export interface ISuggestions {
  suggestions: Array<IAddress>;
}

export interface IAddress {
  value: string;
  unrestricted_value: string;
  data: any;
}
