import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardContentComponent } from './product-card-content.component';


describe('ProductContentComponent', () => {
  let component: ProductCardContentComponent;
  let fixture: ComponentFixture<ProductCardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
  });
});
