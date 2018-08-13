import { Component, OnInit } from '@angular/core';
import { LoginModel } from './../models/login.model';
import { Router } from "@angular/router"
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: LoginModel

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.model = new LoginModel('', '')
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model)
      .subscribe(data => {
        this.authService.saveSession(data)

        this.toastr.success('Login successful.')

        this.router.navigate(['/feed'])
      },
        err => {
          this.toastr.error(err['error']['description'], 'Warning!')
        })
  }
}
