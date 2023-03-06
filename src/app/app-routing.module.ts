import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNoteComponent } from './create-note/create-note.component';
import { AuthGuard } from './helper/auth.guard';
import {LoginComponent} from './login/login.component'
import { NoteListComponent } from './note-list/note-list.component';
import { UpdateNoteComponent } from './update-note/update-note.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'create-note', component: CreateNoteComponent, canActivate:[AuthGuard] },
  { path: 'update-note/:id', component: UpdateNoteComponent, canActivate:[AuthGuard] },
  { path: 'note-list', component: NoteListComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
