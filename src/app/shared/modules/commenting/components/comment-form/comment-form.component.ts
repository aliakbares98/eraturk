import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'era-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  form: FormGroup = this.fb.group({
    name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    message: [null]
  })
  
  ngOnInit(): void {
  }

}
