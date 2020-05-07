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

    loadUserStats(userId: number) {
        return this.http.get<any>(url + `/stats/${userId}`, { headers: this.createAuthHeaders("Basic") })
    }

    loadAllUsers() {
        return this.http.get<any>(url + '/all', { headers: this.createAuthHeaders("Bearer") })
    }

    followUser(userId) {
        return this.http.get<any>(url + `/follow/${userId}`, { headers: this.createAuthHeaders("Bearer") })
    }

    deleteUser(userId) {
        return this.http.delete(url + `${userId}?hard=true`, { headers: this.createAuthHeaders("Master") })
    }

    isUserFollowed(userId) {
        return this.http.get<any>(url + `/is-followed/${userId}`, { headers: this.createAuthHeaders("Bearer") })
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