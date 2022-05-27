import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { latLng, marker, tileLayer } from 'leaflet';
import { REGEX } from 'src/app/shared/data';

@Component({
  selector: 'era-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  constructor(private fb: FormBuilder) { }

  form: FormGroup = this.fb.group({
    name: [null],
    email: [null, [Validators.required, Validators.email]],
    phoneNumber: [null, [Validators.required, Validators.pattern(REGEX.cellphone)]],
    message: [null],
  });


  options = {
    layers: [
      tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      }),
      marker([ 41.10287661826478, 28.987584805591812 ])
    ],
    zoom: 11,
    center: latLng(41.10287661826478, 28.987584805591812)
  };

  ngOnInit(): void {

  }

  send() { }

}
