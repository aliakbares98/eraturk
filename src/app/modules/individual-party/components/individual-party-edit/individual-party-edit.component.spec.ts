import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndividualPartyEditComponent } from './individual-party-edit.component';


describe('PartyEditComponent', () => {
  let component: IndividualPartyEditComponent;
  let fixture: ComponentFixture<IndividualPartyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualPartyEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualPartyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
