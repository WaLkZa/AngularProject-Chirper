import { Component, OnInit } from '@angular/core';
import { ChirpService } from '../services/chirp.service';
import { forkJoin } from 'rxjs';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string
  chirpsCount: number
  following: number
  followers: number
  chirps

  constructor(
    private authService: AuthService,
    private chirpService: ChirpService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.username = localStorage.getItem('username')
  }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.chirpService
      .loadAllChirps()
      .subscribe(result => {
        
        result.chirps.forEach(c => {
          c.time = this.dateConvertor(c.dateCreated);
        })

        this.chirps = result.chirps;
        console.log(this.chirps)
      })

    // let allFollowedChirps = []

    // let users = JSON.parse(localStorage.getItem('subscriptions'))

    // for (let user of users) {
    //   allFollowedChirps.push(this.chirpService.loadAllChirpsByUsername(user))
    // }

    // forkJoin(allFollowedChirps)
    //   .subscribe(arr => {
    //     if (arr.length > 0) {
    //       let allChirpsInOneArray = arr.reduce((result, current) => {
    //         return result.concat(current)
    //       })

    //       allChirpsInOneArray.forEach(c => {
    //         c.time = this.dateConvertor(c._kmd.ect)
    //       })

    //       this.chirps = allChirpsInOneArray
    //     }
    //   })

    // forkJoin(
    //   [
    //     this.chirpService.loadAllChirpsByUsername(this.username),
    //     this.userService.loadUserFollowers(this.username)
    //   ]
    // ).subscribe(([chirpsByUser, followersArr]) => {
    //   this.chirpsCount = (<any>chirpsByUser).length
    //   this.following = JSON.parse(localStorage.getItem('subscriptions')).length
    //   this.followers = (<any>followersArr).length
    // }
    // )
  }

  deleteChirp(id: string) {
    this.chirpService.deleteChirp(id)
      .subscribe(() => {
        this.toastr.info("Chirp deleted.")
        this.loadData()
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
