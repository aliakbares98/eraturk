import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndividualPartyAddComponent } from './individual-party-add.component';


describe('PartyAddComponent', () => {
  let component: IndividualPartyAddComponent;
  let fixture: ComponentFixture<IndividualPartyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualPartyAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualPartyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
  });
});
