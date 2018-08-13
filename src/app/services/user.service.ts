import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';

const appKey = "kid_S1MVEYqMQ"
const appSecret = "8546d0afc25c48a19153f0ae2c6374f7"
const masterSecret = "ea1698304ab4454ea94217e7c7523d6e"
const baseUrl = `https://baas.kinvey.com/user/${appKey}/`

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {
    }

    loadUserByUsername(username: string) {
        let endpoint = `?query={"username":"${username}"}`

        return this.http.get(baseUrl + endpoint, { headers: this.createAuthHeaders("Kinvey") })
    }

    loadUserFollowers(username: string) {
        let endpoint = `?query={"subscriptions":"${username}"}`

        return this.http.get(baseUrl + endpoint, { headers: this.createAuthHeaders("Kinvey") })
    }

    loadAllUsers() {
        return this.http.get(baseUrl, { headers: this.createAuthHeaders("Kinvey") })
    }

    modifyUser(userId, newSubs) {
        let newUser = {
            subscriptions: newSubs
        }

        //return requester.update('user', userId, 'kinvey', newUser)
        return this.http.put(baseUrl + userId, JSON.stringify(newUser), { headers: this.createAuthHeaders("Kinvey") })
    }

    deleteUser(userId) {
        return this.http.delete(baseUrl + `${userId}?hard=true`, { headers: this.createAuthHeaders("Master") })
    }

    private createAuthHeaders(type: string) {
        if (type === "Basic") {
            return new HttpHeaders({
                'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                'Content-Type': 'application/json'
            })
        } else if (type === "Kinvey") {
            return new HttpHeaders({
                'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
                'Content-Type': 'application/json'
            })
        } else if (type === "Master") {
            return new HttpHeaders({
                'Authorization': `Kinvey ${btoa(appKey + ':' + masterSecret)}`,
                'Content-Type': 'application/json'
            })
        }
    }
}