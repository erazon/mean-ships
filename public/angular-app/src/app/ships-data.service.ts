import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Ship } from './ships/ships.component';

@Injectable({
  providedIn: 'root'
})
export class ShipsDataService {
  private apiBaseUrl: string= "http://localhost:3000/api"

  constructor(private http:HttpClient) { }

  public getShips(offset: number, count: number): Promise<Ship[]> {
    console.log('In getShips');
    
    const url: string= this.apiBaseUrl + "/ships?offset="+ offset+ "&count="+ count
    
    return this.http.get(url).toPromise()
                // .then(response => {console.log(response); response as Ship[]})
                .catch(this.handleError);
  }

  public getShip(shipId: string): Promise<Ship> {
    const url: string= this.apiBaseUrl + "/ships/" + shipId;
    
    return this.http.get(url).toPromise()
                // .then(response => {console.log(response); response as Ship})
                .catch(this.handleError);
  }

  public searchShips(lat: number, lng: number, distance: number): Promise<Ship[]> {
    const url: string= this.apiBaseUrl + "/ships?lat="+lat +"&lng="+ lng+ "&dist="+ distance;
    
    return this.http.get(url).toPromise()
                // .then(response => {console.log(response); response as Theater[]})
                .catch(this.handleError);
  }

  private handleError(error: any):Promise<any> {
    return Promise.reject(error.message || error);
  }
}
