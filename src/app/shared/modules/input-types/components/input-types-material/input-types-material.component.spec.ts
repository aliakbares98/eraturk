import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTypesMaterialComponent } from './input-types-material.component';


describe('FeatureInputMaterialComponent', () => {
  let component: InputTypesMaterialComponent;
  let fixture: ComponentFixture<InputTypesMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTypesMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTypesMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
  });
});
