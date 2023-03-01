import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../model/user.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private isAuthenticated = false;
    private apiUrl: 'http://localhost:4200';
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private authStatusListener = new Subject<boolean>();

    constructor(private router: Router, private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    login(username:any, password:any) {
        return this.http.post<any>(`${this.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
