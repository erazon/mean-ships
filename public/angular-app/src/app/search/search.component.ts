import { Component, OnInit } from '@angular/core';
import { ShipsDataService } from '../ships-data.service';
import { Ship } from '../ships/ships.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  lat: number= 0.0; //9.4187222
  lng: number= 0.0; //-79.9283333
  distance: number= 0.0; //1000
  ships: Ship[]= [];

  constructor(private shipService:ShipsDataService) { }

  ngOnInit(): void {
  }

  search(): void {
    console.log("Search");
    console.log(this.lat, this.lng, this.distance);
    
    this.shipService.searchShips(this.lat, this.lng, this.distance).then(response => this.fillShipsFromService(response));
    // location.reload();
  }

  private fillShipsFromService(ships: Ship[]) {
    console.log(ships);
     
    this.ships= ships;
    // location.reload();
  }

}
