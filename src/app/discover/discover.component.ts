import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  users
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.userService.loadAllUsers()
      .subscribe((users) => {
        users.forEach(user => {
          user.followers = users.filter(u => u.subscriptions.includes(user.username)).length
        })

        users = users.filter(u => u.username !== localStorage.getItem('username'))

        users = users.sort((a, b) => b.followers - a.followers) // sort by descending followers

        this.users = users
      })
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id)
      .subscribe(() => {
        this.toastr.info("User deleted.")
        this.loadData()
      })
  }
}
