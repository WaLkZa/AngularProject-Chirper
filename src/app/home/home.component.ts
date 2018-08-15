import { Component, OnInit } from '@angular/core';
import { ChirpService } from '../services/chirp.service';
import { forkJoin } from 'rxjs';
import { UserService } from '../services/user.service';
import { SubmitChirpModel } from '../models/submit-chirp.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
    let allFollowedChirps = []

    let users = JSON.parse(sessionStorage.getItem('subscriptions'))

    for (let user of users) {
      allFollowedChirps.push(this.chirpService.loadAllChirpsByUsername(user))
    }

    forkJoin(allFollowedChirps)
      .subscribe(arr => {
        if (arr.length > 0) {
          let allChirpsInOneArray = arr.reduce((result, current) => {
            return result.concat(current)
          })

          allChirpsInOneArray.forEach(c => {
            c.time = this.dateConvertor(c._kmd.ect)
          })

          this.chirps = allChirpsInOneArray
        }
      })

    forkJoin(
      [
        this.chirpService.loadAllChirpsByUsername(this.username),
        this.userService.loadUserFollowers(this.username)
      ]
    ).subscribe(([chirpsByUser, followersArr]) => {
      this.chirpsCount = (<any>chirpsByUser).length
      this.following = JSON.parse(sessionStorage.getItem('subscriptions')).length
      this.followers = (<any>followersArr).length
    }
    )
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
