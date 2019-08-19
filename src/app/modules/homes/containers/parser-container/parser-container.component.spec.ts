import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserContainerComponent } from './parser-container.component';

describe('ParserContainerComponent', () => {
  let component: ParserContainerComponent;
  let fixture: ComponentFixture<ParserContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParserContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
