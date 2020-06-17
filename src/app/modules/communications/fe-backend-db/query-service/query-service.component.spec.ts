import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryServiceComponent } from './query-service.component';

describe('QueryServiceComponent', () => {
  let component: QueryServiceComponent;
  let fixture: ComponentFixture<QueryServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
