import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url = 'http://localhost:3000/api/user';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {
    }

    loadUserById(userId: number) {
        return this.http.get<any>(url + `/${userId}`, { headers: this.createAuthHeaders("Basic") })
    }

    loadUserFollowers(username: string) {
        let endpoint = `?query={"subscriptions":"${username}"}`

        return this.http.get<any>(url + endpoint, { headers: this.createAuthHeaders("Kinvey") })
    }

    loadAllUsers() {
        return this.http.get<any>(url + '/all', { headers: this.createAuthHeaders("Bearer") })
    }

    modifyUser(userId, newSubs) {
        let newUser = {
            subscriptions: newSubs
        }

        //return requester.update('user', userId, 'kinvey', newUser)
        return this.http.put(url + userId, JSON.stringify(newUser), { headers: this.createAuthHeaders("Kinvey") })
    }

    deleteUser(userId) {
        return this.http.delete(url + `${userId}?hard=true`, { headers: this.createAuthHeaders("Master") })
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