import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    // this.authService.logout()
    //   .subscribe(data => {
    //     this.toastr.success('Logout successful.')
    //     localStorage.clear()
    //     this.authService.authtoken = ""
    //     this.router.navigate(['/login'])
    //   })
    this.toastr.success('Logout successful.')
    localStorage.clear()
    this.authService.authtoken = ""
    this.router.navigate(['/login'])
  }
}
