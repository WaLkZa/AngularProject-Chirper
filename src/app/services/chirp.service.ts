import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

const url = 'http://localhost:3000/api/chirp';

@Injectable()
export class ChirpService {

    constructor(private http: HttpClient,
        private authService: AuthService) {
    }

    loadAllFollowedChirps() {
        return this.http.get<any>(url + '/all-followed', { headers: this.createAuthHeaders("Bearer") })
    }

    loadAllChirpsByUserID(userId: number) {

        return this.http.get<any>(url + `/all/${userId}`, { headers: this.createAuthHeaders("Bearer") })
    }

    loadChirpById(chirpId) {
        return this.http.get<any>(url + `/${chirpId}`, { headers: this.createAuthHeaders("Bearer") })
    }

    loadAllChirps() {
        return this.http.get<any>(url + '/all', { headers: this.createAuthHeaders("Basic") })
    }

    createChirp(userId, content) {
        let chirpData = {
            userId,
            content
        }

        return this.http.post(url + '/create', JSON.stringify(chirpData), { headers: this.createAuthHeaders("Bearer") })
    }

    deleteChirp(chirpId) {
        return this.http.delete(url + `/delete/${chirpId}`, { headers: this.createAuthHeaders("Bearer") })
    }

    editChirp(chirpId, content) {
        let newData = {
            content: content
        }

        return this.http.put(url + `/edit/${chirpId}`, JSON.stringify(newData), { headers: this.createAuthHeaders("Bearer") })
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