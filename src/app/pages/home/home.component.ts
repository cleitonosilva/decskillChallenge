import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/models/tweet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  resum: number ;
  resumLike: number ;
  resumFavorite: number ;


  constructor() { }

  ngOnInit(): void {
  }

  resumTweet (event: Tweet[]) :void {
      if(event.length > 0){
        this.resum = event.length ;
        this.resumLike = event.filter(x => x.like == true).length;
        this.resumFavorite = event.filter(x => x.favourite  == true).length;

      }else{
        this.resum = 0;
        this.resumLike = 0;
        this.resumFavorite = 0;
      }

  }

}
