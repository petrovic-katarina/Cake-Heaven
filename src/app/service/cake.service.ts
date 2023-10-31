import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cake } from '../model/cake.model';

const baseUrl = 'http://localhost:3000/api/cakes';

@Injectable({
  providedIn: 'root'
})
export class CakeService {

  constructor(private http: HttpClient) { }

  getAllCakes(): Observable<Cake[]> {
    return this.http.get(`${baseUrl}`).pipe(map((data: any) => {
      return data && data.map((elem: any) => new Cake(elem)) || [];
    }))
  }
}
