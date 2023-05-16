import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CityService {


  constructor(private http: HttpClient) {
  }

    getCities(): Observable<any> {
        return this.http.get(`http://localhost:8099/v1/cities`)
            .pipe(map(response => {
                if (response) {
                    return response;
                }
                return [];
            }));
    }

    getSports(): Observable<any> {
        return this.http.get(`http://localhost:8099/v1/sports`)
            .pipe(map(response => {
                if (response) {
                    return response;
                }
                return [];
            }));
    }
}
