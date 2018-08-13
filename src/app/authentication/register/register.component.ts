import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: RegisterModel

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.model = new RegisterModel('', '', '')
  }

  ngOnInit() {
  }

  register() {
    delete this.model['repeatPass']

    this.authService
      .register(this.model)
      .subscribe(data => {
        this.authService.saveSession(data)

        this.toastr.success('Registration successful. You are now logged in!')

        this.router.navigate(['/feed'])
      },
        err => {
          this.toastr.error(err['error']['description'], 'Warning!')
        })
  }

}
