import { Component, OnInit } from '@angular/core';
import { ChirpService } from '../services/chirp.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { SubmitChirpModel } from '../models/submit-chirp.model';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css']
})
export class UserFeedComponent implements OnInit {
  model: SubmitChirpModel
  username: string
  chirpsCount: number
  following: number
  followers: number
  chirps

  constructor(
    private chirpService: ChirpService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.model = new SubmitChirpModel('')
    this.username = sessionStorage.getItem('username')
  }

  ngOnInit() {
    forkJoin(
      [
        this.chirpService.loadAllChirpsByUsername(this.username),
        this.userService.loadUserFollowers(this.username),
        this.userService.loadUserByUsername(this.username)
      ]).subscribe(([chirpsArr, followersArr, user]) => {
        this.chirpsCount = chirpsArr.length
        this.following = user[0].subscriptions.length
        this.followers = followersArr.length

        chirpsArr.forEach(c => {
          c.time = this.dateConvertor(c._kmd.ect)
          c.isAuthor = c.author === sessionStorage.getItem('username')
        })

        this.chirps = chirpsArr
      })
  }

  submitChirp() {
    this.chirpService.createChirp(this.model.text, this.username)
      .subscribe(() => {
        this.toastr.info("Chirp published.")
      })
  }

  dateConvertor(dateIsoFormat) {
    // @ts-ignore
    let diff = new Date() - (new Date(dateIsoFormat));
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);

    function pluralize(value) {
      if (value !== 1) return 's';
      else return '';
    }
  }
}
