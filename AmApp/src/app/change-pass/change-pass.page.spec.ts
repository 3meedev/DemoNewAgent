import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassPage } from './change-pass.page';

describe('ChangePassPage', () => {
  let component: ChangePassPage;
  let fixture: ComponentFixture<ChangePassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
