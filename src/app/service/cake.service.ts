import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cake } from '../model/cake.model';

const baseUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class CakeService {

  constructor(private http: HttpClient) { }

  // http://localhost:3000/api/cakes

  getAllCakes(params?: any): Observable<Cake[]> {
    let options = {};

    if (params) {
      options = {
        params: new HttpParams()
          .set("filter", params.filter && JSON.stringify(params.filter) || "")
          .set("sort", params.sort || "")
          .set("sortDirection", params.sortDirection || "")
      }
    }

    return this.http.get(`${baseUrl}/cakes`, options).pipe(map((data: any) => {
      return data && data.map((elem: any) => new Cake(elem)) || [];
    }))
  }

  // http://localhost:3000/api/ingredients

  getIngredientsList(): Observable<string[]> {
    return this.http.get(`${baseUrl}/ingredients`).pipe(map((data: any) => {
      return data as Array<string> || [];
    }))
  }
}
