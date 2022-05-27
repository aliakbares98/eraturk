import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// import Swiper core and required modules
import SwiperCore, { Navigation, Thumbs } from "swiper/core";

// install Swiper modules
SwiperCore.use([Navigation, Thumbs]);

@Component({
  selector: 'era-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {
  thumbsSwiper: any;
  loading = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  send() {

  }

}
