import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemSettingEditComponent } from './system-setting-edit.component';


describe('SystemSettingEditComponent', () => {
  let component: SystemSettingEditComponent;
  let fixture: ComponentFixture<SystemSettingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
