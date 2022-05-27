import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierProductListComponent } from './supplier-product-list.component';


describe('ProductListComponent', () => {
  let component: SupplierProductListComponent;
  let fixture: ComponentFixture<SupplierProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
  });
});
