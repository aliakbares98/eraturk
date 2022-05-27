import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'era-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarRatingComponent implements OnInit {

  @Input('rating') rating: number = 0;
  @Output() private onRateUpdated = new EventEmitter();

  ratingArr: number[] = [];

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    for (let index = 0; index < 5; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating: number) {
    this.rating = rating;
    this.onRateUpdated.emit(rating);
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}

