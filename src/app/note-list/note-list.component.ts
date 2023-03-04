import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  id: number;
  notes: any;
  notesList: any;
  lenempty: any;
  selected = '1';
  constructor(private authenticationService: AuthService) {
      this.id = this.authenticationService.currentUserValue.id;
      this.lenempty = false;
  }

  ngOnInit() {
      this.notes = JSON.parse(localStorage.getItem('notesList'));
      const index = this.notes.findIndex(x => x.id === this.id);
      if (index >= 0) {
          this.notesList = this.notes[index].userNotes.map(x => JSON.parse(x) ).reverse();
          this.notesList.map(item => {
            item.isHovered = false
          })
      } else {
          this.lenempty = true;
      }
  }
  sortByPriority(e){
    if (e.value == 0)
    this.notesList.sort((a, b) => a.priorityLevel - b.priorityLevel);
    else 
    this.notesList.sort((a, b) => b.priorityLevel - a.priorityLevel);
  }
}
