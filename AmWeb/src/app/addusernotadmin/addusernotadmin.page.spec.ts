import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddusernotadminPage } from './addusernotadmin.page';

describe('AddusernotadminPage', () => {
  let component: AddusernotadminPage;
  let fixture: ComponentFixture<AddusernotadminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddusernotadminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddusernotadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
