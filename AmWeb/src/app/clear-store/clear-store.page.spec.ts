import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearStorePage } from './clear-store.page';

describe('ClearStorePage', () => {
  let component: ClearStorePage;
  let fixture: ComponentFixture<ClearStorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearStorePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
