import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:8099/v1/';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    getUserById(userId: number) {
        return this.http
            .get<any>(`http://localhost:8099/v1/getUser/${userId}`);
    }
}