import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {Placement as PopperPlacement, Options} from '@popperjs/core'
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helper/jwt.interceptor';
import { ErrorInterceptor } from './helper/error.interceptor';
import { fakeBackendProvider } from './helper/fake-backend';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './header/header.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NotifficationComponent } from './notiffication/notiffication.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    CreateNoteComponent,
    NoteListComponent,
    NotifficationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbAlertModule,
    FormsModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
