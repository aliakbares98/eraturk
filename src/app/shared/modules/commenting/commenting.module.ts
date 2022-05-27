import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentsComponent } from './components/comments/comments.component';


@NgModule({
  declarations: [
    CommentsComponent,
    CommentFormComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule
  ],
  exports: [
    CommentsComponent,
    CommentFormComponent
  ]
})
export class CommentingModule { }
