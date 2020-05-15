import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { JwtHelperService } from "@auth0/angular-jwt";
import { LoginModel } from '../authentication/models/login.model';
import { RegisterModel } from '../authentication/models/register.model';

const ADMIN_ROLE_ID = '5275abc5-fdbb-455e-ac27-a4b3e53a8ce1'

const url = 'http://localhost:3000/api/user';

@Injectable()
export class AuthService {
    private currentAuthtoken: string
//    helper = new JwtHelperService();

    constructor(private http: HttpClient) {
    }

    login(model: LoginModel) {
        return this.http.post(url + '/login',
            JSON.stringify(model),
            {
                headers: this.createAuthHeaders('Basic')
            })
    }

    register(model: RegisterModel) {
        return this.http.post(url + '/register',
            JSON.stringify(model),
            {
                headers: this.createAuthHeaders('Basic')
            })
    }

    logout() {
        return this.http.post(url,
            {},
            {
                headers: this.createAuthHeaders('Kinvey')
            })
    }

    get authtoken() {
        return this.currentAuthtoken;
    }

    set authtoken(value: string) {
        this.currentAuthtoken = value
    }

    isAuthenticated() {
        return localStorage.getItem('authtoken') !== null;
    }

    isAdmin() {
        return localStorage.getItem('roleId') !== null;
    }

    saveSession(userInfo) {
        const {
            token,
            username,
            userId
        } = userInfo;

        localStorage.setItem('authtoken', token);
        localStorage.setItem('username', username);
        localStorage.setItem('userId', userId);
        //localStorage.setItem('subscriptions', JSON.stringify(userInfo.subscriptions));

        // if (userInfo._kmd.roles) {
        //     for (let userRole of userInfo._kmd.roles) {
        //         if (userRole.roleId === ADMIN_ROLE_ID) {
        //             localStorage.setItem('roleId', ADMIN_ROLE_ID)
        //         }
        //     }
        // }
    }

    private createAuthHeaders(type: string) {
        if (type === "Basic") {
            return new HttpHeaders({
                'Content-Type': 'application/json'
            })
        } else {
            return new HttpHeaders({
                'Authorization': `Bearer ${localStorage.getItem('authtoken')}`,
                'Content-Type': 'application/json'
            })
        }
    }
}