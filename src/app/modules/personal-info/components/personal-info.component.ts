import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'era-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  person = ['First name', 'Last name', 'Phone number', 'Country', 'Province'];
  personalInfo = [{
    FirstName: 'aliakbar',
    LastName: 'esmaeili',
    PhoneNumber: '5012454200',
    Country: 'iran',
    Province: 'istanbul',
  }]

  constructor(private router:Router) { }

  ngOnInit(): void {


  }


}
