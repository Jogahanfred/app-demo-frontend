import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Squadron } from './squadron.component';

describe('Squadron', () => {
  let component: Squadron;
  let fixture: ComponentFixture<Squadron>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Squadron]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Squadron);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
