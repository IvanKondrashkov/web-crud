import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {
  noteForm: FormGroup;   // Форма для ввода данных
  // id = 1;
  // tslint:disable-next-line:variable-name
  header = '';
  // tslint:disable-next-line:variable-name
  note = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  id: number;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  getNote(id: any) {
    // Запрос заметки у сервиса
    console.log('getNote id= ' + id);
    this.api.getNote(id).subscribe((data: any) => {
      this.id = data.id;
      // Заполнение формы ввода данных
      this.noteForm.setValue({
        header: data.header,
        note: data.note
      });
      console.log('data.header = ' + data.header);
    });
  }

  onFormSubmit() {
    // Прием данных с заполненной формы добавления заметки
    console.log(this.noteForm.value);
    this.header = this.noteForm.get('header').value;
    // Приведение формата для заметки
    this.noteForm.patchValue({header: this.header});
    console.log('this.header = ' + this.header);
    console.log(this.noteForm.value);
    this.isLoadingResults = true;
    // Сохранение данных на сервисе
    this.api.updateNote(this.id, this.noteForm.value)
      .subscribe((res: any) => {
          // const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/note-details', this.id]);
          console.log('onFormSubmit id= ' + this.id);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  noteDetails() {
    this.router.navigate(['/note-details', this.id]);
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.id = params['id']);
    console.log('Edit OnInit id = ' + this.id);
    this.getNote(this.id);
    // Создание формы ввода данных
    this.noteForm = this.formBuilder.group({
      header : [null, Validators.required],
      note : [null, Validators.required]
    });
  }
}
