import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductTemplateEditComponent } from './product-template-edit.component';


describe('ProductTemplateEditComponent', () => {
  let component: ProductTemplateEditComponent;
  let fixture: ComponentFixture<ProductTemplateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTemplateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
