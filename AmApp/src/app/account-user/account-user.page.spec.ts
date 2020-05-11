import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUserPage } from './account-user.page';

describe('AccountUserPage', () => {
  let component: AccountUserPage;
  let fixture: ComponentFixture<AccountUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
