import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Tweet } from 'src/app/models/tweet';
import { TweetService } from 'src/app/services/tweet.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss'],
})
export class TweetListComponent implements OnInit {
  listTweet: Tweet[];
  subscription: Subscription;
  user: User;
  selectedDelete: Tweet;
  @Output() resumTweet = new EventEmitter();

  constructor(private tweetService: TweetService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.initializer();
  }

  initializer() {
    this.user = this.tweetService.getUser();

    this.subscription = this.tweetService.getTweet().subscribe((x) => {
      if(x) {
        this.listTweet = x;
        this.resumTweet.emit(this.listTweet);
      }
      if(x == null || x.length == 0) {
        localStorage.removeItem("list-tweet");
      };

    });
  }

  like(tweet: Tweet) {
    this.tweetService.setLike(tweet);
  }

  favorite(tweet: Tweet) {
    this.tweetService.setFavorite(tweet);
  }

  deleteItemModal() {
    this.tweetService.deleteTweet(this.selectedDelete);
  }

  deleteTweet(tweet: Tweet) {
    this.selectedDelete = tweet;
  }

  timeLapse(tweet: Tweet) {
    const end = new Date();
    const start = new Date(tweet.date);

    for (let i = 0; i < 1000; i++) {
      Math.sqrt(i);
    }
    const minute  = end.getMinutes() - start.getMinutes();
    const seconds = end.getSeconds() - start.getSeconds();

    if (minute < 1) {
      return `${seconds} ago`;
    } else {
      return `published at ${this.datePipe.transform(new Date(tweet.date), 'dd/MM/yyyy HH:mm ')}`
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
