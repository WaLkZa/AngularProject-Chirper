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
  isLoading: boolean = true

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
      .loadAllFollowedChirps()
      .subscribe(result => {
        
        result.chirps.forEach(c => {
          c.time = this.dateConvertor(c.dateCreated);
        })

        this.chirps = result.chirps;
        this.isLoading = false;
      })
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
