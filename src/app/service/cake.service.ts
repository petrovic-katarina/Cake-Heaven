import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cake } from '../model/cake.model';
import { User } from '../model/user.model';
import { Message } from '../model/message.model';
import { Slide } from '../model/slide.model';

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

  // http://localhost:3000/api/cakes/:id

  getOneCake(id: number): Observable<Cake> {
    return this.http.get(`${baseUrl}/cakes/${id}`).pipe(map((data: any) => {
      return new Cake(data);
    }))
  }

  // http://localhost:3000/api/user
  getUser(): Observable<User> {
    return this.http.get(`${baseUrl}/user`).pipe(map((data: any) => {
      return data && new User(data[0]);
    }))
  }

  // http://localhost:3000/api/user/:id
  changeUserData(user: User): Observable<User> {
    return this.http.put(`${baseUrl}/user/${user._id}`, user).pipe(map((data: any) => {
      return new User(data);
    }))
  }

  // http://localhost:3000/api/messages
  postMessage(message: Message): Observable<Message> {
    return this.http.post(`${baseUrl}/messages`, message).pipe(map((data: any) => {
      return new Message(data);
    }))
  }

  getSlides(): Observable<Slide[]> {
    return this.http.get(`${baseUrl}/slideshow`).pipe(map((data: any) => {
      return data && data.map((elem: any) => new Slide(elem)) || [];
    }))
  }




}
