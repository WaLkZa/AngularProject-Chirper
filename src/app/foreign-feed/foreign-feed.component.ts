import { Component, OnInit } from '@angular/core';
import { ChirpService } from '../services/chirp.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-foreign-feed',
  templateUrl: './foreign-feed.component.html',
  styleUrls: ['./foreign-feed.component.css']
})
export class ForeignFeedComponent implements OnInit {
  username: string
  chirpsCount: number
  following: number
  followers: number
  chirps
  isFollowed: boolean = false

  constructor(
    private chirpService: ChirpService,
    private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.username = this.route.snapshot.params['username']
    this.isFollowed = JSON.parse(sessionStorage.getItem('subscriptions')).includes(this.username)
    
    forkJoin(
      [
        this.chirpService.loadAllChirpsByUsername(this.username),
        this.userService.loadUserFollowers(this.username),
        this.userService.loadUserByUsername(this.username)
      ]
    ).subscribe(([chirpsArr, followersArr, user]) => { 
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

  followUser() {
    let userId = sessionStorage.getItem('userId')

    // Create a copy of arr
    let newSubArr = JSON.parse(sessionStorage.getItem('subscriptions')).splice(0)
    newSubArr.push(this.username)

    this.userService.modifyUser(userId, newSubArr)
      .subscribe(() => {
        this.toastr.info(`Subscribed to ${this.username}`)

        sessionStorage.setItem('subscriptions', JSON.stringify(newSubArr))

        this.isFollowed = JSON.parse(sessionStorage.getItem('subscriptions')).includes(this.username)
      })
  }

  unfollowUser() {
    let userId = sessionStorage.getItem('userId')
    let newSubArr = JSON.parse(sessionStorage.getItem('subscriptions')).splice(0)
    let indexOfEl = newSubArr.indexOf(this.username)
    newSubArr.splice(indexOfEl, 1)

    this.userService.modifyUser(userId, newSubArr)
      .subscribe(() => {
        this.toastr.info(`Unsubscribed to ${this.username}`)

        sessionStorage.setItem('subscriptions', JSON.stringify(newSubArr))

        this.isFollowed = JSON.parse(sessionStorage.getItem('subscriptions')).includes(this.username)
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