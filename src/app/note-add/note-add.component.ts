import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {ErrorStateMatcher} from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.css']
})
export class NoteAddComponent implements OnInit {
// Форма для ввода полей
  noteForm: FormGroup;
  header = '';
  note = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // Создание формы ввода
    this.noteForm = this.formBuilder.group({
      id: [null],
      header : [null, Validators.required],
      note : [null, Validators.required]
    });
  }
  onFormSubmit() {
    // Сохранение заметки через сервис
    this.isLoadingResults = true;
    this.api.addNote(this.noteForm.value)
      .subscribe((res: any) => {
        console.log('res = ' + res);
        // const id = res._id;
        this.isLoadingResults = false;
        console.log('addNote')
        // this.router.navigate(['/note-details', id]);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
