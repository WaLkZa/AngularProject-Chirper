import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  users
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.loadAllUsers()
      .subscribe((users) => {
        users.forEach(user => {
          user.followers = "ne e gotovo" //users.filter(u => u.subscriptions.includes(user.username)).length
        })

        users = users.filter(u => u.username !== sessionStorage.getItem('username'))

        users = users.sort((a, b) => b.followers - a.followers) // sort by descending followers

        this.users = users
      })
  }

}
