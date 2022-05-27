import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardHorizontalComponent } from './product-card-horizontal.component';


describe('ProductCardHorizontalComponent', () => {
  let component: ProductCardHorizontalComponent;
  let fixture: ComponentFixture<ProductCardHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardHorizontalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
