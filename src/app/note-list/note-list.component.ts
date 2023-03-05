import { ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
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
  searchText: string;
  start: number = 0;
  limit: number = 10;
  constructor(private authenticationService: AuthService, private elementRef: ElementRef) {
    this.id = this.authenticationService.currentUserValue.id;
    this.lenempty = false;
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (window.innerHeight + window.scrollY >= this.elementRef.nativeElement.offsetHeight) {
      setTimeout(() => {
        this.limit += 10
        this.loadData()
      }, 100);


    }
  }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.notes = JSON.parse(localStorage.getItem('notesList'));
    const index = this.notes.findIndex(x => x.id === this.id);
    if (index >= 0) {
      this.notesList = this.notes[index].userNotes.map(x => JSON.parse(x)).reverse();
      this.notesList.map(item => {
        item.isHovered = false
      })
    } else {
      this.lenempty = true;
    }
    this.notesList = this.notesList.slice(0, this.limit)
  }
  sortByPriority(e) {
    if (e.value == 0)
      this.notesList.sort((a, b) => a.priorityLevel - b.priorityLevel);
    else
      this.notesList.sort((a, b) => b.priorityLevel - a.priorityLevel);
  }
  search() {
    this.notesList.filter(items => items.title.includes(this.searchText))
  }
  onLoadMore() {
    this.limit += 10
    this.loadData();
  }
}
