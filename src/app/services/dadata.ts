import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API_KEY } from 'src/env';

@Injectable({ providedIn: 'root' })
export class daDataService {
  constructor(private _http: HttpClient) {}

  public address$ = new Subject<ISuggestions>();
  public straddress$ = new Subject<string>();

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
    this._http
      .get<IOSM[]>(
        `https://nominatim.openstreetmap.org/search.php?q=${lat},${lon}&polygon_geojson=1&format=json`
      )
      .subscribe((c) => {
        console.log(c);
        if (c.length > 0) {
          this.straddress$.next(
            c[0].display_name.split(',').slice(0, 3).reverse().join(', ')
          );
        }
      });
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

export interface IOSM {
  addresstype: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  name: string;
  osm_id: number;
}
