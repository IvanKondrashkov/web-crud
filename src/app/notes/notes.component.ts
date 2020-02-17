import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
// @ts-ignore
import {Notes} from '../notes';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyErrorStateMatcher} from '../note-add/note-add.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  filterForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  displayedColumns: string[] = ['id', 'header', 'note'];
  dataSource: MatTableDataSource<Notes> = new MatTableDataSource<Notes>();
  data: Notes[];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  isLoadingResults = true;
  // tslint:disable-next-line:variable-name
  constructor(private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.api.getNotes()
      .subscribe((res: Notes[]) => {
        this.dataSource.data = res;
        this.data = res;
        console.log('this.dataSource = ', this.dataSource.data);
        this.isLoadingResults = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
}
