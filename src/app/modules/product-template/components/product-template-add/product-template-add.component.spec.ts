import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductTemplateAddComponent } from './product-template-add.component';


describe('ProductTemplateAddComponent', () => {
  let component: ProductTemplateAddComponent;
  let fixture: ComponentFixture<ProductTemplateAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTemplateAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTemplateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
