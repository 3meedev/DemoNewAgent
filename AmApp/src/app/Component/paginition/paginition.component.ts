import { Component, OnInit } from '@angular/core';
import { ComponentModule } from '../component.module'
@Component({
  selector: 'app-paginition',
  templateUrl: './paginition.component.html',
  styleUrls: ['./paginition.component.scss'],

})
export class PaginitionComponent implements OnInit {
  // game: any = [];
  p: number = 1;
  game = [
  {
    "id": "1",
    "name": "dota"
  },
  {
    "id": "2",
    "name": "dota1"
  },
  {
    "id": "3",
    "name": "dota2"
  },
  {
    "id": "4",
    "name": "dota3"
  },
  {
    "id": "5",
    "name": "dota4"
  },
  {
    "id": "6",
    "name": "dota5"
  },
  {
    "id": "7",
    "name": "dota6"
  }
];
constructor() { }
ngOnInit() {
  console.log(this.game);
}
}
