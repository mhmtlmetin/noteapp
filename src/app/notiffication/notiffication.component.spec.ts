import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifficationComponent } from './notiffication.component';

describe('NotifficationComponent', () => {
  let component: NotifficationComponent;
  let fixture: ComponentFixture<NotifficationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifficationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
