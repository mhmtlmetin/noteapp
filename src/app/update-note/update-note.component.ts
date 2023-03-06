import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NotesService } from '../services/notest.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {

  noteForm: FormGroup;
  isLoading = false;
  isSubmitted = false;
  image: any;
  isInvalidImage = false;
  id;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private notesService: NotesService,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      priorityLevel: new FormControl('', [
        Validators.min(0),
        Validators.max(5),
        Validators.pattern("^[0-5]*$"),
      ]),
      note: ['', Validators.required],
      uploadImage: ['']
    });
  }

  get f() { return this.noteForm.controls; }

  getImage(event) {
    this.isInvalidImage = false;
    const reader = new FileReader();
    localStorage.setItem('imgData', null);
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = reader.result.toString();
        if (img.match(/^data:image\/(png|jpg|jpeg|gif);base64,/)) {
          this.image = img;
        } else {
          this.isInvalidImage = true;
          return;
        }
      };
    }

  }

  deleteImage() {
    this.image = '';
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.noteForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.notesService.updateNote(this.id,this.f.title.value, this.f.note.value, this.image, this.f.priorityLevel.value)
      .pipe(first())
      .subscribe(
        data => {
          
          this.router.navigate(['note-list']);
        },
        error => {
          this.isLoading = false;
        });
  }

}
