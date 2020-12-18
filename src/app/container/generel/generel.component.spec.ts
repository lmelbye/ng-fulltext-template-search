import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerelComponent } from './generel.component';

describe('GenerelComponent', () => {
  let component: GenerelComponent;
  let fixture: ComponentFixture<GenerelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
