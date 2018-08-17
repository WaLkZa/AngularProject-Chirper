import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AppRoutingModule } from './app.routing';
import { NavigationComponent } from './navigation/navigation.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ChirpService } from './services/chirp.service';
import { UserService } from './services/user.service';
import { LogoutComponent } from './authentication/logout/logout.component';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { UserFeedComponent } from './user-feed/user-feed.component';
import { EditChirpComponent } from './edit-chirp/edit-chirp.component';
import { ForeignFeedComponent } from './foreign-feed/foreign-feed.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    NotFoundComponent,
    LogoutComponent,
    HomeComponent,
    DiscoverComponent,
    UserFeedComponent,
    EditChirpComponent,
    ForeignFeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthService, ChirpService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
