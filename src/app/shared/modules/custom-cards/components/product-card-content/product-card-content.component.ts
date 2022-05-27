import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentDTO } from 'src/app/shared/dto';
import { v4 } from 'uuid';

@Component({
  selector: 'era-product-card-content',
  templateUrl: './product-card-content.component.html',
  styleUrls: ['./product-card-content.component.scss']
})
export class ProductCardContentComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() content: ContentDTO;
  loading = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  onCardClicked(event: MouseEvent) {
    this.router.navigate([`/content-details/image/${v4()}`]);
  }
}
