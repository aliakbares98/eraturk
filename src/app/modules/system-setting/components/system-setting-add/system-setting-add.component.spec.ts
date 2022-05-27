import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemSettingAddComponent } from './system-setting-add.component';


describe('SystemSettingAddComponent', () => {
  let component: SystemSettingAddComponent;
  let fixture: ComponentFixture<SystemSettingAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
