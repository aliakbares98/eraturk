import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'era-swiper-header',
  templateUrl: './swiper-header.component.html',
  styleUrls: ['./swiper-header.component.scss']
})
export class SwiperHeaderComponent implements OnInit {

  constructor() { }

  @Output() clickOnPrev: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() clickOnNext: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() clickOnMore: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Input() title: string;
  @Input() moreLink: string;

  ngOnInit(): void {
  }

  onClickPrev(e: MouseEvent) {
    this.clickOnPrev.emit(e);
  }

  onClickNext(e: MouseEvent) {
    this.clickOnNext.emit(e);
  }

  onClickMore(e: MouseEvent) {
    this.clickOnMore.emit(e);
  }
}

