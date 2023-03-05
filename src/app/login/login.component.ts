import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';


@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss'] })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService,
        private alertService: AlertService
    ) {
        // eğer login olduysa anasayfaya yönlendir
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
        
    }

    ngOnInit() {
      const initialUser = [{"id":"1","firstname":"admin", "lastname":"admin", "username":"admin", "password":"12345"}]
      localStorage.setItem("users",JSON.stringify(initialUser))
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams[this.returnUrl] || '/';
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
