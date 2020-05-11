import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsernotadminPage } from './edit-usernotadmin.page';

describe('EditUsernotadminPage', () => {
  let component: EditUsernotadminPage;
  let fixture: ComponentFixture<EditUsernotadminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUsernotadminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUsernotadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
