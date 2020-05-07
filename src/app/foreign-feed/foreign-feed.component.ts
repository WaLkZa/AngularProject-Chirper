import { Component, OnInit } from '@angular/core';
import { ChirpService } from '../services/chirp.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-foreign-feed',
  templateUrl: './foreign-feed.component.html',
  styleUrls: ['./foreign-feed.component.css']
})
export class ForeignFeedComponent implements OnInit {
  isLoading: boolean = true
  foreignUserId: number
  chirpsCount: number
  following: number
  followers: number
  isFollowed: boolean = false
  user //https://stackoverflow.com/questions/39755336/angular2-cannot-read-property-name-of-undefined

  constructor(
    private authService: AuthService,
    private chirpService: ChirpService,
    private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.foreignUserId = this.route.snapshot.params['id'];

    forkJoin(
    [
      this.userService.isUserFollowed(this.foreignUserId),
      this.userService.loadUserById(this.foreignUserId),
      this.userService.loadUserStats(this.foreignUserId)
      ])
      .subscribe(([resultIsFollowed, resultUser, resultStats]) => {
        this.isFollowed = Boolean(resultIsFollowed.isFollowed);
        
        let chirps = resultUser.user.chirps;

        this.following = resultStats.stats[0].followingCount;
        this.followers = resultStats.stats[0].followersCount;
        this.chirpsCount = chirps.length;

        chirps.forEach(c => {
          c.time = this.dateConvertor(c.dateCreated);
        })

        this.user = resultUser.user;
        this.isLoading = false;
    })
  }

  followUser() {
    this.followUnfollowAction(true);
  }
  unfollowUser() {
    this.followUnfollowAction(false);
  }
  
  private followUnfollowAction(isFollowActionTriggered: boolean) {
    this.userService
      .followUser(this.foreignUserId)
      .subscribe(result => {
        this.toastr.info(result.message);
        
        this.isFollowed = !this.isFollowed;

        if (isFollowActionTriggered) {
          this.followers++;
        } else {
          this.followers--;
        }
      })
  }

  deleteChirp(id: string) {
    this.chirpService.deleteChirp(id)
      .subscribe(() => {
        this.toastr.info("Chirp deleted.")
        //this.loadData()
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