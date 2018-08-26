import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

const appKey = "kid_S1MVEYqMQ"
const appSecret = "8546d0afc25c48a19153f0ae2c6374f7"
const masterSecret = "ea1698304ab4454ea94217e7c7523d6e"
const baseUrl = `https://baas.kinvey.com/appdata/${appKey}/`

@Injectable()
export class ChirpService {

    constructor(private http: HttpClient,
        private authService: AuthService) {
    }

    loadFollowersChirps(subs) {
        let endpoint = `chirps?query={"author":{"$in": [${subs}]}}&sort={"_kmd.ect": -1}`

        return this.http.get<any>(baseUrl + endpoint, { headers: this.createAuthHeaders("Kinvey") })
    }

    loadAllChirpsByUsername(username: string) {
        let endpoint: string = `chirps?query={"author":"${username}"}&sort={"_kmd.ect": -1}`

        return this.http.get<any>(baseUrl + endpoint, { headers: this.createAuthHeaders("Kinvey") })
    }

    loadChirpById(chirpId) {
        let endpoint = `chirps?query={"_id":"${chirpId}"}`

        return this.http.get<any>(baseUrl + endpoint, { headers: this.createAuthHeaders("Kinvey") })
    }

    loadAllChirps() {
        let endpoint = `chirps?query={}&sort={"_kmd.ect": -1}`

        return this.http.get(baseUrl + endpoint, { headers: this.createAuthHeaders("Master") })
    }

    createChirp(text, author) {
        let chirpData = {
            text,
            author
        }

        return this.http.post(baseUrl + 'chirps', JSON.stringify(chirpData), { headers: this.createAuthHeaders("Kinvey") })
    }

    deleteChirp(chirpId) {
        console.log(this.createAuthHeaders("Master"))
        return this.http.delete(baseUrl + `chirps/${chirpId}`,
            { headers: this.createAuthHeaders(this.authService.isAdmin() ? "Master" : "Kinvey") }
        )

    }

    editChirp(chirpId, author, text) {
        let newData = {
            author: author,
            text: text
        }

        return this.http.put(baseUrl + `chirps/${chirpId}`, JSON.stringify(newData),
            { headers: this.createAuthHeaders(this.authService.isAdmin() ? "Master" : "Kinvey") }
        )
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
                'Authorization': `Basic ${btoa(`${appKey}:${masterSecret}`)}`,
                'Content-Type': 'application/json'
            })
        }
    }
}