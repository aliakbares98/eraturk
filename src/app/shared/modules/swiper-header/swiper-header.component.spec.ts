import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwiperHeaderComponent } from './swiper-header.component';


describe('SwiperHeaderComponent', () => {
  let component: SwiperHeaderComponent;
  let fixture: ComponentFixture<SwiperHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwiperHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
