import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../authentication/models/login.model';
import { RegisterModel } from '../authentication/models/register.model';

const ADMIN_ROLE_ID = '5275abc5-fdbb-455e-ac27-a4b3e53a8ce1'

const appKey = "kid_S1MVEYqMQ" // APP KEY HERE;
const appSecret = "8546d0afc25c48a19153f0ae2c6374f7" // APP SECRET HERE;
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;

@Injectable()
export class AuthService {
    private currentAuthtoken: string

    constructor(private http: HttpClient) {
    }

    login(model: LoginModel) {
        return this.http.post(loginUrl,
            JSON.stringify(model),
            {
                headers: this.createAuthHeaders('Basic')
            })
    }

    register(model: RegisterModel) {
        return this.http.post(registerUrl,
            JSON.stringify(model),
            {
                headers: this.createAuthHeaders('Basic')
            })
    }

    logout() {
        return this.http.post(logoutUrl,
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
        //return this.currentAuthtoken === localStorage.getItem('authtoken');
        return localStorage.getItem('authtoken') !== null;
    }

    isAdmin() {
        return localStorage.getItem('roleId') !== null;
    }

    saveSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        localStorage.setItem('authtoken', userAuth);
        let username = userInfo.username;
        localStorage.setItem('username', username);
        localStorage.setItem('userId', userInfo._id);
        localStorage.setItem('subscriptions', JSON.stringify(userInfo.subscriptions));

        if (userInfo._kmd.roles) {
            for (let userRole of userInfo._kmd.roles) {
                if (userRole.roleId === ADMIN_ROLE_ID) {
                    localStorage.setItem('roleId', ADMIN_ROLE_ID)
                }
            }
        }
    }

    private createAuthHeaders(type: string) {
        if (type === "Basic") {
            return new HttpHeaders({
                'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                'Content-Type': 'application/json'
            })
        } else {
            return new HttpHeaders({
                'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
                'Content-Type': 'application/json'
            })
        }
    }
}