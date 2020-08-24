import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChangePwdComponent } from './admin-change-pwd.component';

describe('AdminChangePwdComponent', () => {
  let component: UserChangePwdComponent;
  let fixture: ComponentFixture<UserChangePwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChangePwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChangePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
