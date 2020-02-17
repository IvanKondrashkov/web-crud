// Просмотр детали в отдельном окне
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
// @ts-ignore
import {Notes} from '../notes';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  note: Notes = { id: '', header: '', note: ''};
  isLoadingResults = true;
  private id: any;
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  getNoteDetails(id: any) {
    // Запрос детали по ключу у сервиса
    this.api.getNote(id)
      .subscribe((data: any) => {
        this.note = data;
        console.log(this.note);
        this.isLoadingResults = false;
      });
  }

  deleteNote(id: any) {
    // Удаление детали через сервис
    this.isLoadingResults = true;
    this.id = id;
    this.api.deleteNote(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/notes']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  ngOnInit() {
    this.getNoteDetails(this.route.snapshot.params.id);
  }
}
