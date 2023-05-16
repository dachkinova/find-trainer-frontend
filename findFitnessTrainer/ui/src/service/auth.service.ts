import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../model/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const API_URL = 'http://localhost:8099/v1/';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    isLoggedIn: any;

    isAdmin: boolean = false;

    constructor(private http: HttpClient, private router: Router) {
        this.userSubject = new BehaviorSubject<User>(
            JSON.parse(<string>localStorage.getItem('currentUser'))
        );
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email: string, password: string): Observable<any> {
        console.log(email + " " + password);
        // let token = uuidv4();
        // window.localStorage.removeItem('session-token');
        // window.localStorage.setItem('session-token', token);
        return this.http.post('http://localhost:8099/v1/login', {
                email,
                password
            },
            httpOptions);
    };

    registration(firstName: string, lastName: string, email: string, password: string, isTrainer: boolean): Observable<any> {
        console.log("email: " + email + "   password: " + password);
        return this.http.post(`http://localhost:8099/v1/register`, {
                    firstName,
                    lastName,
                    email,
                    password,
                    isTrainer
                },
            httpOptions);
    }

    // logout() {
    //   localStorage.removeItem('session-token');
    //   // this.userSubject.next(new User());
    // }

    logout(): Observable<any> {
        return this.http.post('http://localhost:8099/v1/logOutUser', {}, httpOptions);
    }

    signOut(): void {
        window.sessionStorage.clear();
        window.alert("You signed out of your account")
    }

    public saveToken(token: string): void {
        window.sessionStorage.removeItem('session-token');
        window.sessionStorage.setItem('session-token', token);
    }

    public getToken(): string | null {
        return window.sessionStorage.getItem('session-token');
        //return localStorage.getItem('session-token');
    }

    public saveUser(user: any): void {
        window.sessionStorage.removeItem('session-token');
        window.sessionStorage.setItem('session-token', JSON.stringify(user));
        localStorage.setItem('session-token', user.sessionToken);
    }

    public getUser(): any {
        const user = window.sessionStorage.getItem('auth-user');
        if (user) {
            return JSON.parse(user);
        } else {
            return {};
        }
    }
}
