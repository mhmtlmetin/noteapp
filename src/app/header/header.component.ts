import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { User } from '../model/user.model';

@Component({
    selector : 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit, OnDestroy {
    userIsAuthenticated = false;
    private authListenerSubs: Subscription;
    currentUser: User;
    name: string;
    constructor(
        private router: Router,
        private authenticationService: AuthService) {
            this.authenticationService.currentUser.subscribe(x => {
                this.currentUser = x;
                if (this.currentUser != null) {
                    this.userIsAuthenticated = true;
                } else {
                    this.userIsAuthenticated = false;
                }
            });
        }



    ngOnInit() {
        this.userIsAuthenticated = this.authenticationService.getIsAuth();
        this.authenticationService.currentUser.subscribe(x => {
            this.currentUser = x;
            if (this.currentUser != null) {
                this.userIsAuthenticated = true;
                this.name = this.currentUser.username;
            } else {
                this.userIsAuthenticated = false;
            }
        });
    }

    onLogout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    ngOnDestroy() {
        this.authListenerSubs.unsubscribe();
    }
}
