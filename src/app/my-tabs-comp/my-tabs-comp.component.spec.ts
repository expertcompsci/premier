import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTabsCompComponent } from './my-tabs-comp.component';

describe('MyTabsCompComponent', () => {
  let component: MyTabsCompComponent;
  let fixture: ComponentFixture<MyTabsCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTabsCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTabsCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
