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
  isLoading: boolean = true
  
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
      .subscribe((result) => {
        // users.forEach(user => {
        //   user.followers = users.filter(u => u.subscriptions.includes(user.username)).length
        // })

        result.users = result.users.filter(u => u.name !== localStorage.getItem('username'))

        //users = users.sort((a, b) => b.followers - a.followers)

        this.users = result.users
        this.isLoading = false;
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
