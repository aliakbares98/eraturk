import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'era-gallery-slider',
  templateUrl: './gallery-slider.component.html',
  styleUrls: ['./gallery-slider.component.scss']
})
export class GallerySliderComponent implements OnInit {

  constructor(private http: HttpClient) { }

  selectedImage = '../../../../../assets/images/product-details-gallery/1.jpg';
  loading = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
  
  onSelectImage(index: number) {
    this.selectedImage = `../../../../../assets/images/product-details-gallery/${index}.jpg`;
  }
}
