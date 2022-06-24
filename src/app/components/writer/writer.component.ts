import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tweet } from 'src/app/models/tweet';
import { User } from 'src/app/models/user';
import { TweetService } from 'src/app/services/tweet.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-writer',
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.scss']
})
export class WriterComponent implements OnInit {
  public formTweet: FormGroup;
  public user: User;
  public tweet: Tweet[] = [];
  public subscription: Subscription;

  constructor(private formBuilder: FormBuilder, private tweetService: TweetService ) { }

  ngOnInit(): void {
    this.initializer()
  }

  initializer(){
    this.criarFormulario();
    this.user = this.tweetService.getUser();
    this.restoreTweet();
    this.updateTweet();
  }

  restoreTweet(){
    let retrievedObject = JSON.parse(localStorage.getItem('list-tweet') || '{}');
    if(retrievedObject.length >= 1){

      retrievedObject.forEach((x: Tweet) => {
        this.tweet.push(x);
      });
      this.tweetService.setTweet(this.tweet);
    }
  }

  updateTweet(){
    this.subscription = this.tweetService.getTweet().subscribe(res => this.tweet = res ?? []);
  }


  criarFormulario() {
    this.formTweet = this.formBuilder.group({
      tweet: ['', [Validators.required, Validators.maxLength(130)]],
    });
  }


  submited(){
    const textValue = this.formTweet.controls['tweet'].value;
    let objTweet = new Tweet();
    let id = Math.floor(Math.random() * 65536);
    if(this.tweet.length >= 1){
      let verifyId = this.tweet.find(x =>
        x.id == id
      )
      if(verifyId){
        id = Math.floor(Math.random() * 65536);
      }
    };

    objTweet.id = id;
    objTweet.tweet = textValue;
    objTweet.like = false;
    objTweet.favourite  = false;
    objTweet.date= new Date();

    this.tweet.unshift(objTweet);
    localStorage.setItem("list-tweet", JSON.stringify(this.tweet));
    this.tweetService.setTweet(this.tweet)
    this.formTweet.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
