import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotesComponent} from './notes/notes.component';
import {NoteDetailComponent} from './note-detail/note-detail.component';
import {NoteAddComponent} from './note-add/note-add.component';
import {NoteEditComponent} from './note-edit/note-edit.component';


const routes: Routes = [
  {
    path: 'notes',
    component: NotesComponent,
    data: {title: 'List of Notes'}
  },
  {
    path: 'note-details/:id',
    component: NoteDetailComponent,
    data: {title: 'Note Details'}
  },
  {
    path: 'note-add',
    component: NoteAddComponent,
    data: {title: 'Add Note'}
  },
  {
    path: 'note-edit/:id',
    component: NoteEditComponent,
    data: {title: 'Edit Note'}
  },
  { path: '',
    redirectTo: '/notes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
