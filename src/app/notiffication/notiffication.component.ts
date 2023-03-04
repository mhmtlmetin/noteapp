import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-notiffication',
  templateUrl: './notiffication.component.html',
  styleUrls: ['./notiffication.component.scss']
})
export class NotifficationComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
    message: any;
    type: string;
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
        .subscribe(message => {
            switch (message && message.type) {
                case 'success':
                    this.type = 'success';
                    break;
                case 'error':
                    this.type = 'danger';
                    break;
            }

            this.message = message;
        });
}

ngOnDestroy() {
    this.subscription.unsubscribe();
}

}
