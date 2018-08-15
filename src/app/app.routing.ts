import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from "./authentication/register/register.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { LogoutComponent } from "./authentication/logout/logout.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./authentication/guards/auth.guard";
import { DiscoverComponent } from "./discover/discover.component";
import { UserFeedComponent } from "./user-feed/user-feed.component";

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'feed', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'discover', component: DiscoverComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: UserFeedComponent, canActivate: [AuthGuard] },
    { path: '**', component: NotFoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }