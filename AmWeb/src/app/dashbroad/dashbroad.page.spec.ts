import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbroadPage } from './dashbroad.page';

describe('DashbroadPage', () => {
  let component: DashbroadPage;
  let fixture: ComponentFixture<DashbroadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashbroadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbroadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
