import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTabCompComponent } from './my-tab-comp.component';

describe('MyTabCompComponent', () => {
  let component: MyTabCompComponent;
  let fixture: ComponentFixture<MyTabCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTabCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTabCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
