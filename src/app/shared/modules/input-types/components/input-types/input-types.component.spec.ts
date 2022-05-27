import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTypesComponent } from './input-types.component';


describe('ProductFeatureInputComponent', () => {
  let component: InputTypesComponent;
  let fixture: ComponentFixture<InputTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
  });
});
