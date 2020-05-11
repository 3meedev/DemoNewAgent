import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClearPage } from './edit-clear.page';

describe('EditClearPage', () => {
  let component: EditClearPage;
  let fixture: ComponentFixture<EditClearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClearPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
