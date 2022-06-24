import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  user: User;
  constructor(private tweetService: TweetService) { }

  ngOnInit(): void {
    this.initializer()
  }


  initializer() {
    this.user = this.tweetService.getUser();
  }

}
