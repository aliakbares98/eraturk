import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndividualPartyListComponent } from './individual-party-list.component';


describe('PartyListComponent', () => {
  let component: IndividualPartyListComponent;
  let fixture: ComponentFixture<IndividualPartyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualPartyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualPartyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
