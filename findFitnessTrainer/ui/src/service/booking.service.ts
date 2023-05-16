import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {StorageService} from "./storage.service";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

interface HttpOptions {
    params?: HttpParams;
    headers?: HttpHeaders;
}

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    currentTrainerInfo: any;

    constructor(private http: HttpClient, private router: Router, private storageService: StorageService) {

    }

    createReservation(date: string, hour: string, trainerId: string) {
        let userId = this.storageService.getUser().id;
        const params = new HttpParams()
            .set('date', date)
            .set('hour', hour)
            .set('userId', userId)
            .set('trainerId', trainerId);
        return this.http.post<any>('http://localhost:8099/v1/createReservation', {}, { params });
    }

    getReservationsByTrainerAndDate(trainerId: number, date: string) {
        return this.http.get<any>(`http://localhost:8099/v1/getTrainerReservationsByDate?trainerId=${trainerId}&date=${date}`,
            httpOptions);
    }

    getTrainerReservations(trainerId: number) {
        return this.http.get<any>(`http://localhost:8099/v1/getTrainerReservations/${trainerId}`,
            httpOptions);
    }
    getClientReservations(clientId: number) {
        return this.http.get<any>(`http://localhost:8099/v1/getClientReservations/${clientId}`,
            httpOptions);
    }

    updateReservationStatus(id: number, isConfirmed: boolean, isDeclined: boolean, notReliable: boolean) {
        return this.http
            .post<any>(`http://localhost:8099/v1/updateReservationStatus?id=${id}&isConfirmed=${isConfirmed}&isDeclined=${isDeclined}&notReliable=${notReliable}`,
                httpOptions);
    }
}
